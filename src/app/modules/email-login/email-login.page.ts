import { Component, OnInit } from "@angular/core";
import { FirebaseCrashlytics } from "@capacitor-community/firebase-crashlytics";
import { FirebaseRemoteConfig } from "@joinflux/firebase-remote-config";
import { activate, fetchAndActivate, fetchConfig, getBoolean, getNumber, getRemoteConfig, getString, getValue } from "firebase/remote-config";
import { AuthService } from "src/app/services/auth.service";
import firebase from "firebase/compat/app";
import { environment } from "src/environments/environment";


@Component({
  selector: "app-email-login",
  templateUrl: "./email-login.page.html",
  styleUrls: ["./email-login.page.scss"],
})
export class EmailLoginPage implements OnInit {
  public isOpen = true;
  constructor(private _authService: AuthService) {
  }

  ngOnInit() {

    console.log('email..');
  }
  signUp() {
    this.isOpen = false;
  }

  signIn() {
    this.isOpen = true;
  }
}
