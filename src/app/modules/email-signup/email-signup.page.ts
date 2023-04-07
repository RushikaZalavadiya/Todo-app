import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StripeService } from 'src/app/services/stripe.service';
import * as firebaseErrorCodes from 'firebase-error-codes';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.page.html',
  styleUrls: ['./email-signup.page.scss'],
})
export class EmailSignupPage {
  id: string;
  signupForm: FormGroup;
  constructor(
    public _authService: AuthService,
    public stripe: StripeService,
    public router: Router,
    public loading: LoadingService
  ) {

    this.signupForm = new FormGroup({
      email: new FormControl('test@gmail.com', [Validators.email, Validators.required]),
      password: new FormControl('123456', [Validators.minLength(6), Validators.required]),
    });

    if (router) {

      const data = router.getCurrentNavigation().extras.state;
      if (data) {


        this.id = data['id'];
      }
    }
  }
  onSubmit() {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {
      this._authService
        .signUpWithEmail(
          this.signupForm.controls["email"].value,
          this.signupForm.controls["password"].value
        )
        .then((userCredential) => {
          console.log(userCredential.user);
          this.loading.present('Loaing...').then(() => {
            if (userCredential) {
              this.stripe.createCustomer(this.signupForm.controls['email'].value).subscribe((customer) => {
                console.log(customer, 'cust');
                this.stripe.createPaymentMethod().subscribe((pm) => {
                  console.log(pm);
                  this.stripe.attachPaymentMethod(customer['id'], pm['id']).subscribe((res) => {
                    console.log(res);
                    this.stripe.updateCustomer(customer['id'], pm['id']).subscribe((res) => {
                      console.log(res);
                      // this.stripe.createSubscription(customer['id'], this.id).subscribe((res) => {
                      //   console.log(res);
                      // })
                      this.loading.dismiss();
                      this.stripe.checkout(this.id).subscribe((res) => {
                        console.log(res);
                        window.location.replace(res['url'])
                      })
                    })
                  })
                })
              })
            }
          })
        }).catch((e) => {
          console.log(e.message);
          if (e instanceof Error) {
            if (e.message.includes('auth/email-already-in-use')) {
              this._authService.toastMsg('Email is already exists. Please try with different.');
            } else {
              this._authService.toastMsg('Something went wrong. Please try again.');
            }
          }
        });
    } else {
      return false;
    }
  }
  get formData() {
    return this.signupForm.controls;
  }
}
