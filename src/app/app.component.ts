import { Component } from "@angular/core";
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
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
    if(isPlatform('mobileweb')){
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig).then(res=>{
        console.log(res);
      });
    }
  }
}
