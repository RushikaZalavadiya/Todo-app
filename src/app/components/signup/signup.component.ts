import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public signUpfrm: FormGroup;
  constructor(
    private _authService: AuthService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.signUpfrm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  get user() {
    return this.signUpfrm.controls;
  }

  signUp() {
    this.signUpfrm.markAllAsTouched();

    if (this.signUpfrm.valid) {
      this._authService
        .signUpWithEmail(
          this.signUpfrm.controls["email"].value,
          this.signUpfrm.controls["password"].value
        )
        .then((userCredential) => {
          console.log(userCredential.user);

          // if(userCredential){
          //   const alert = await this.alertCtrl.create({
          //     header: 'Account created',
          //     buttons: [
          //       {
          //         text: 'Ok',
          //         role: 'confirm',
          //       }
          //     ]
          //   });
          //   alert.present();
          // }
        });
    } else {
      return false;
    }
  }
}
