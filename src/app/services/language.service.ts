import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(public translate: TranslateService) {}

  initializeLang() {
    this.translate.addLangs(["en"]);
    this.translate.setDefaultLang("en");
  }

  getInstant(key: string) {
    return this.translate.instant(key);
  }
}
