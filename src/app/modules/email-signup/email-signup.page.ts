import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.page.html',
  styleUrls: ['./email-signup.page.scss'],
})
export class EmailSignupPage implements OnInit {

  signupForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('test@gmail.com', [Validators.email, Validators.required]),
      password: new FormControl('123456', [Validators.minLength(6), Validators.required]),
    });
  }
  onSubmit() {

  }
  get formData() {
    return this.signupForm.controls;
  }
}
