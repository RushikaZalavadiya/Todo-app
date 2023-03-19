import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.page.html',
  styleUrls: ['./email-signup.page.scss'],
})
export class EmailSignupPage implements OnInit {

  signupForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }
  get formData() {
    return this.signupForm.controls;
  }
  onSubmit() {

  }
}
