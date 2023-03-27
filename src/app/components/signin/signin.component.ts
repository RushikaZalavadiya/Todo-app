import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TodoService } from "src/app/services/todo.service";
import { TranslateService } from "@ngx-translate/core";
import * as firebaseErrorCodes from 'firebase-error-codes';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  public signInfrm: FormGroup;
  public message: string;
  constructor(
    private _authService: AuthService,
    public router: Router,
    private _todoService: TodoService,
    private _translateService: TranslateService
  ) { }

  ngOnInit() {
    this.signInfrm = new FormGroup({
      email: new FormControl("test@gmail.com", Validators.required),
      password: new FormControl("123456", Validators.required),
    });

  }

  get user() {
    return this.signInfrm.controls;
  }

  signIn() {

    this.signInfrm.markAllAsTouched();

    if (this.signInfrm.valid) {
      this._authService
        .signInWithEmail(
          this.signInfrm.controls["email"].value,
          this.signInfrm.controls["password"].value
        )
        .then((userCredential) => {
          console.log(userCredential.user, "user");
          this.router.navigate(["dashboard"]);
        })
        .catch((error) => {
          console.log(error);

          if (error.code == firebaseErrorCodes.Auth.userNotFound) {
            this._translateService.get("UserNotFound").subscribe((msg) => {
              this.message = msg;
            });
            this._authService.toastMsg(this.message);
          }
        });
    } else {
      return false;
    }
  }
}
