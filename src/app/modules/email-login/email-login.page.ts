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
  constructor(private _authService:AuthService) {
  }
  
  ngOnInit() {
   
    this._authService.logEvent('Email-login');
    console.log('email..');  
  }
  signUp() {
    this.isOpen = false;
  }

  signIn() {
    this.isOpen = true;
  }
  setUserProperty(){
    this._authService.setUserProperty();
  }
  setUID(){
    this._authService.setUID();
  }
  crash(){
    this._authService.crash();
  }
  setContext(){
    this._authService.setContext();
  }
  setUserID(){
    this._authService.setUserId();
  }
  addLogMessage(){
    this._authService.sendLogMessage();
  }
  checkPrevious(){
    this._authService.checkPrevious();
  }

  async getDefault(){
  //  const remoteConfig = getRemoteConfig(firebase.initializeApp(environment.firebaseConfig));
  //   remoteConfig.settings.minimumFetchIntervalMillis = 3600; 

    // this.remoteConfig.defaultConfig = {
    //   "number": "123456",
    //   "boolean" : false,
    //   "greeting" : "hello",
    //   "test_new" : "data"
    // };
  //  const data = await fetchAndActivate(this.remoteConfig);
  //  console.log(data);
   
    const getBooleanval = await FirebaseRemoteConfig.getBoolean({key:"boolean"});
    console.log(getBooleanval, 'boolean');

    const getNumberval = await FirebaseRemoteConfig.getNumber({key:"number"});
    console.log(getNumberval , 'numbers');    

    const getStringval = await FirebaseRemoteConfig.getString({key : "greeting"});
    console.log(getStringval, 'get string');
    
    const string = await FirebaseRemoteConfig.getString({key : "test1"});
    console.log(string, 'get string');

    const test_new = await FirebaseRemoteConfig.getString({key : "test_new"});
    console.log(test_new, 'get string');

    const fetchData = await FirebaseRemoteConfig.fetch();
    console.log(fetchData);
    
    const fetchActivate = await FirebaseRemoteConfig.fetchAndActivate();
    console.log(fetchActivate);
    
  }    
}
