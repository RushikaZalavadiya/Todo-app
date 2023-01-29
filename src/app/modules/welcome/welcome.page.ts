import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FacebookLogin,
  FacebookLoginResponse,
} from "@capacitor-community/facebook-login";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { TranslateService } from "@ngx-translate/core";
import { USER_ID } from "src/app/constants/commonKeys";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"],
})
export class WelcomePage implements OnInit {
  constructor(
    public router: Router,
    private _authService: AuthService,
    public translate: TranslateService
  ) {
    this.initializeApp();
    translate.addLangs(["en", "nl"]);
    translate.setDefaultLang("en");
  }

  ngOnInit() {
    this._authService.logEvent('Welcome Page');
  }

  initializeApp() {
    GoogleAuth.initialize({
      clientId:
        "668049412758-mgqq5of12cuq02pf1qf9co2u9u24313d.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      grantOfflineAccess: true,
    });

    FacebookLogin.initialize({ appId: "5195857290520104" });
  }

  loginWithEmail() {
    this.router.navigate(["email-login"]);
  }

  loginWithGoogle() {
    this._authService
      .signInWithGoogle()
      .then((userCredential) => {
        console.log(userCredential.user);
        localStorage.setItem(USER_ID.uid, userCredential.user.uid);
        this.router.navigate(["dashboard"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loginWithFacebook() {
    this._authService
      .loginWithFacebook()
      .then((res: FacebookLoginResponse) => {
        if (res.accessToken) {
          console.log("access token : " + res.accessToken);
          this._authService
            .onFacebookLogin(res)
            .then((userCredential) => {
              console.log(userCredential.user);
              localStorage.setItem(USER_ID.uid, userCredential.user.uid);
              this.router.navigate(["dashboard"]);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
