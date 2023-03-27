import { Component } from "@angular/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { isPlatform } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { LanguageService } from "./services/language.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(public langService: LanguageService) {
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
  }

  checkPermission() {
    LocalNotifications.checkPermissions().then((res) => {
      console.log(res);
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
          smallIcon: ''
        }
      ]
    })
  }
}
