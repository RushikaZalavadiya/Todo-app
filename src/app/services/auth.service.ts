import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import {
  GoogleAuthProvider, FacebookAuthProvider
} from "@firebase/auth";
import {
  FacebookLogin,
  FacebookLoginResponse,
} from "@capacitor-community/facebook-login";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { USER_ID } from "../constants/commonKeys";
import { LanguageService } from "./language.service";
import { User } from "../interfaces/todo";
// import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
// import { FirebaseCrashlytics } from "@capacitor-community/firebase-crashlytics";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public _user$: BehaviorSubject<any> = new BehaviorSubject(null);

  public userCollection = "User";
  public visitorCollection = "Visitor";

  constructor(
    public toastCtrl: ToastController,
    public router: Router,
    private _langService: LanguageService,
  ) {
    this.getUser();
    GoogleAuth.initialize({
      clientId: '190294578941-78ob3avlc728dlp53t3agvkttaf4mj22.apps.googleusercontent.com',
      grantOfflineAccess: true,
      scopes: ['email']
    })
    FacebookLogin.initialize({ appId: '5195857290520104' })
  }

  addProUser(user: User, id: string) {
    return firebase.firestore().collection(this.userCollection).doc(id).set(user);
  }
  addVisitor() {
    return firebase.firestore().collection(this.visitorCollection).add({});
  }
  getUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._user$.next(user);
        this.router.navigate(["dashboard"]);
      }
      // else {
      //   this.router.navigate(["welcome"]);
      // }
    });
  }
  get user() {
    return this._user$.asObservable();
  }

  signInWithEmail(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  SignUpWIthForgotPassWord(email) {
    return firebase.auth().sendPasswordResetEmail(email)
  }
  async signInWithGoogle() {
    let googleUser = await GoogleAuth.signIn();
    const credential = GoogleAuthProvider.credential(
      googleUser.authentication.idToken
    );
    return firebase.auth().signInWithCredential(credential);
  }

  loginWithFacebook() {
    const FACEBOOK_PERMISSIONS = [
      "email",
      "user_birthday",
      "user_photos",
      "user_gender",
    ];
    return FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
  }

  onFacebookLogin(response: FacebookLoginResponse) {
    const credential = FacebookAuthProvider.credential(
      response.accessToken.token
    );
    return firebase.auth().signInWithCredential(credential);
  }

  async toastMsg(message: string) {
    const toastMsg = await this.toastCtrl.create({
      message: this._langService.getInstant(message),
      duration: 3000,
    });
    toastMsg.present();
  }

  signOut() {
    localStorage.removeItem(USER_ID.uid);
    return firebase.auth().signOut();
  }


}
