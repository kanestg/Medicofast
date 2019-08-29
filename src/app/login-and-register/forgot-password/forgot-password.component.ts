import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../api.service';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  submitted = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    }, {validator: MustMatch('password', 'confirm_password')}
    );
  }

  // convenience getter for easy access to form fields
  get form() { return this.forgotForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.forgotForm.valid) {
      this.api.userForgot(
        this.forgotForm.value.email,
        this.forgotForm.value.otp,
        this.forgotForm.value.password
      )
      .subscribe(
        (response: any) => {
          console.log('Success! ', response);
        },
        error => {
          console.log('Error! ', error);
        }
      );
    }
  }
}

