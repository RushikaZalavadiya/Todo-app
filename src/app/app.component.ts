import { Component } from "@angular/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { LoadingController, isPlatform } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { LanguageService } from "./services/language.service";
import { FirebaseDynamicLinks } from "@pantrist/capacitor-firebase-dynamic-links";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { USER_ID } from "./constants/commonKeys";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(public langService: LanguageService, public router: Router, public loadingCtrl: LoadingController, public auth: AuthService) {
    langService.initializeLang();
    if (isPlatform('mobileweb')) {
      // FirebaseAnalytics.initializeFirebase(environment.firebaseConfig).then(res=>{
      //   console.log(res);
      // });
    }
    if (isPlatform('ios')) {
      this.checkPermission();
    } else {
      this.schedule();
    }
    this.getLinkData();
  }
  ionViewWillEnter() {
    this.getData();
  }
  async getData() {
    const loading = await this.loadingCtrl.create({ message: 'Loading...' });
    loading.present();
    this.auth.getUserProfile().then((res) => {
      console.log(res.data());
      loading.dismiss();
      localStorage.setItem(USER_ID.profile, JSON.stringify(res.data()));
    })
  }
  getLinkData() {
    FirebaseDynamicLinks.addListener('deepLinkOpen', (data) => {
      console.log(data.url);
      this.router.navigate(['/email-login']);
    })
  }
  checkPermission() {
    LocalNotifications.checkPermissions().then((res) => {
      // console.log(res);
      if (res.display == 'granted') {
        this.schedule();
      } else {
        LocalNotifications.requestPermissions().then((res) => {
          console.log(res);
          if (res.display == 'denied') {
            return;
          } else {
            this.schedule();
          }
        })
      }
    })
  }
  async schedule() {
    await LocalNotifications.schedule({
      notifications: [
        {
          body: 'Enjoy your day!!',
          id: 1,
          title: 'Add task',
          smallIcon: 'todo'
        }
      ]
    })
  }
}
