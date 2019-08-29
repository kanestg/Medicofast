import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../api.service';
import { Router } from '@angular/router';


declare const gapi: any;
declare var $: any;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;
  public previousUrl: string;


  constructor(private api: ApiService, private formBuilder: FormBuilder, private router: Router, private ngZone: NgZone) {
    gapi.load('auth2', function () {
      gapi.auth2.init();
    });
    this.previousUrl = this.api.getPreviousUrl();
  }

  ngOnInit() {
    $('.toast').toast('show');
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



/***  FUCNTIONS DEFINITION STARTS ***/

  // convenience getter for easy access to form fields
    public get form() {
      return this.loginForm.controls;
    }
  // Get forms value
    public onSubmit() {
      this.submitted = true;
      if (this.loginForm.valid) {
        this.api.userLogin(this.loginForm.value)
        .subscribe(
          (response: any) => {
            localStorage.setItem('userProfile', JSON.stringify(response.data[0]));
            this.router.navigate([this.previousUrl]);
          },
          error => {
            console.log('Error! ', error);
          }
        );
      }
    }
  // Google login
    public googleLogin() {
      const googleAuth = gapi.auth2.getAuthInstance();
      googleAuth.then(() => {
        googleAuth.signIn().then((googleUser: any) => {
          if (googleAuth.isSignedIn.get()) {
            const profile = googleUser.getBasicProfile();
            // console.log('ID: ' + profile.getId());
            // console.log('Full Name: ' + profile.getName());
            // console.log('Given Name: ' + profile.getGivenName());
            // console.log('Family Name: ' + profile.getFamilyName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail());
            // // The ID token you need to pass to your backend:
            // const id_token = googleUser.getAuthResponse().id_token;
            // console.log('ID Token: ' + id_token);
            const data = {
              'access_token': googleUser.getAuthResponse().id_token,
              'name': profile.getName(),
              'img': profile.getImageUrl(),
              'email': profile.getEmail()
            };
            localStorage.setItem('userProfile', JSON.stringify(data));
            this.ngZone.run(() => this.router.navigate([this.previousUrl]));
          }
        });
      });
    }

/***  FUCNTIONS DEFINITION ENDS ***/

}
