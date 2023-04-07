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
import "firebase/compat/firestore"
// import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
// import { FirebaseCrashlytics } from "@capacitor-community/firebase-crashlytics";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public _user$: BehaviorSubject<any> = new BehaviorSubject(null);
  public _regUser$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    public toastCtrl: ToastController,
    public router: Router,
    private _langService: LanguageService,
  ) {
    // this.getUser();
  }
  visitorUser() {
    return firebase.firestore().collection('Visitor').add({ test: 'test' });
  }

  getUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._user$.next(user);
        this._user$.subscribe(data => {
          console.log(data);

        })

        this.router.navigate(["dashboard"]);
      }
      // else {
      //   this.router.navigate(["welcome"]);
      // }
    });
  }
  regUser(user: any) {
    return firebase.firestore().collection('regUser').add(user);

  }
  getregUser() {
    firebase
      .firestore()
      .collection('regUser')

      .onSnapshot((snapshot) => {
        console.log(snapshot);
        const data = snapshot.docs.map((doc) => ({

          id: doc.id,
          ...doc.data(),
        }));

        console.log("user data", data);

        this._regUser$.next(data);
      });
    return this._regUser$.asObservable();
  }

  gets() {

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
