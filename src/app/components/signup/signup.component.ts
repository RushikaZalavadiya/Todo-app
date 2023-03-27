import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

          if (userCredential) {
            if (userCredential) {
              // this.stripe.createCustomer(this.loginForm.controls['email'].value).subscribe((res) => {
              //   console.log(res, 'cust');

              // })
            }
          }
        });
    } else {
      return false;
    }
  }
}
