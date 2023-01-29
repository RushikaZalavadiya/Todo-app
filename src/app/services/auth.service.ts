import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
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
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { FirebaseCrashlytics } from "@capacitor-community/firebase-crashlytics";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public _user$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    public toastCtrl: ToastController,
    public router: Router,
    private _langService: LanguageService
  ) {
    this.getUser();
  }

  getUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._user$.next(user);
        this.router.navigate(["dashboard"]);
      } else {
        this.router.navigate(["welcome"]);
      }
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

  logEvent(event){
    FirebaseAnalytics.logEvent({
      name:event,
      params: {
        content_type: "event from device",
        content_id: "event from device (id)",
        items: [{ name: "event from device" }],
      },
    })
  }
  setUserProperty(){
    FirebaseAnalytics.setUserProperty({
      name:'Favourite_food',
      value:'pizza'
    })
    console.log('set user property...');
  }
  setUID(){
    FirebaseAnalytics.setUserId({
      userId:'DDDwTrlrGDQh62J48aN7eY5Cnlq1'
    })
    console.log('set user id...');    
  }
  crash(){
    FirebaseCrashlytics.crash({message:'crash'})
    .then((res)=>{
      console.log('crash res...',res);      
    }).catch((e)=>{
      console.log('crash err',e);      
    });
  }
  setContext(){
    FirebaseCrashlytics.setContext({
      key: 'page',
      value: 'home',
      type: 'string'
    }).then((res)=>{
      console.log('setcontext res...',res);      
    }).catch((e)=>{
      console.log('setcontext err',e);      
    });
  }
  setUserId(){
    FirebaseCrashlytics.setUserId({
      userId:'123456'
    }).then((res)=>{
      console.log('setUserId res...',res);      
    }).catch((e)=>{
      console.log('setUserId err',e);      
    });
  }
  sendLogMessage(){
    FirebaseCrashlytics.addLogMessage({
      message:'Test crash add log message...'
    }).then((res)=>{
      console.log('addLogMessage res...',res);      
    }).catch((e)=>{
      console.log('addLogMessage err',e);      
    });
  }
  checkPrevious(){
    FirebaseCrashlytics.didCrashDuringPreviousExecution()
    .then((res)=>{
      console.log('didCrashDuringPreviousExecution res...',res);      
    }).catch((e)=>{
      console.log('didCrashDuringPreviousExecution err',e);      
    });
  }
}
