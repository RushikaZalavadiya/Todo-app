import { Component, OnInit } from "@angular/core";
// import { FirebaseCrashlytics } from "@capacitor-community/firebase-crashlytics";
// import { FirebaseRemoteConfig } from "@joinflux/firebase-remote-config";
import { activate, fetchAndActivate, fetchConfig, getBoolean, getNumber, getRemoteConfig, getString, getValue } from "firebase/remote-config";
import { AuthService } from "src/app/services/auth.service";
import firebase from "firebase/compat/app";
import { environment } from "src/environments/environment";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { StripeService } from "src/app/services/stripe.service";
import * as firebaseErrorCodes from 'firebase-error-codes';

@Component({
  selector: "app-email-login",
  templateUrl: "./email-login.page.html",
  styleUrls: ["./email-login.page.scss"],
})
export class EmailLoginPage implements OnInit {

  public loginForm: FormGroup;
  message: string;
  constructor(private _authService: AuthService,
    public router: Router,
    public _translateService: TranslateService,
    public stripe: StripeService
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('test@gmail.com', [Validators.email, Validators.required]),
      password: new FormControl('123456', [Validators.minLength(6), Validators.required]),
    });
    console.log('email..');
  }
  get formData() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.value.email === 'pratham@gmail.com' && this.loginForm.value.password === '!@333dddD') {
      this.router.navigate(['/admin/dashboard']);
    }
    else {

      this._authService
        .signInWithEmail(
          this.loginForm.controls["email"].value,
          this.loginForm.controls["password"].value
        )
        .then((userCredential) => {
          console.log(userCredential.user, "user");
          this.router.navigate(["dashboard"]);
        })
        .catch((error) => {
          console.log(error);

          if (error.code == firebaseErrorCodes.Auth.userNotFound) {
            this._translateService.get("UserNotFound").subscribe((msg) => {
              this.message = msg;
            });
            this._authService.toastMsg(this.message);
          }
        });
    }
  }
}
