import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../api.service';
import { MustMatch } from '../helpers/must-match.validator';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;
  notification: any;
  notification_time: any;
  message_type: any;
  response_got = false;
  response_error = false;
  submit_loader = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    $('.toast').toast('show');

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    }, {validator: MustMatch('password', 'confirm_password')}
    );
  }

  // convenience getter for easy access to form fields
  get form() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.submit_loader = true;
      this.api.userRegistration(this.registrationForm.value)
      .subscribe(
        (response: any) => {
          this.submit_loader = false;
          this.response_got = true;
          this.notification = response.data[0];
          this.message_type = this.notification.message_type;
          this.notification_time = new Date().toString().substring(16, 21);
          if (this.notification.error === false) {
            this.response_error = false;
          } else {
            this.response_error = true;
          }
        },
        error => {
          this.response_got = true;
          this.response_error = true;
          this.message_type = 'Error';
          this.notification_time = new Date().toString().substring(16, 21);
          if (error.statusText === 'Unknown Error') {
            error.message = 'Unknown Error!';
            this.notification = error;
          }
          console.log('Error! ', error);
        }
      );
    }
  }
  closeBox() {
    this.response_got = false;
  }
}
