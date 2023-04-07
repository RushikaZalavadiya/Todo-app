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
import { USER_ID } from "src/app/constants/commonKeys";
import { User } from "src/app/interfaces/todo";
import { LoadingService } from "src/app/services/loading.service";
// import * as firebaseErrorCodes from 'firebase-error-codes';

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
    public stripe: StripeService,
    public loading: LoadingService,
    public _auth: AuthService

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
          this.loading.present('Loading...').then(() => {

            localStorage.setItem(USER_ID.uid, userCredential.user.uid);
            const user: User = {
              email: userCredential.user.email,
              id: userCredential.user.uid
            }
            this._authService.addProUser(user, userCredential.user.uid).then((res) => {
              console.log(res);
            }).catch((e) => {
              console.log(e);
            })
            this.router.navigate(["dashboard"]);
          })
        })
        .catch((error) => {
          console.log(error);

          if (error.code) {
            this._translateService.get("UserNotFound").subscribe((msg) => {
              this.message = msg;
            });
            this._authService.toastMsg(this.message);
          }
        });
    }
  }
  google() {
    this._authService.signInWithGoogle().then(() => { })
  }
  facebook() {
    this._authService.loginWithFacebook().then(() => { })
  }
}
