import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: any
  constructor(public _auth: AuthService) { }

  ngOnInit() {
  }
  recover() {
    firebase.auth().sendPasswordResetEmail(this.email).then((data) => {
      console.log(data)
    }).catch((Err) => {
      console.log(Err)
    })
    console.log(this.email)
    // this._auth.SignUpWIthForgotPassWord(this.email).then(data => {
    //   console.log(data);
    //   this.presentToast('Password reset email sent', 'bottom', 1000); // this is toastController
    //   // this.router.navigateByUrl('/login');
    // })
    //   .catch(err => {
    //     console.log(` failed ${err}`);
    //     // this.error = err.message;
    //   });;
    // this.fireauth.sendPasswordResetEmail(this.email)

  }
  // email(email: any) {
  //   throw new Error('Method not implemented.');
  // }
  presentToast(arg0: string, arg1: string, arg2: number) {
    throw new Error('Method not implemented.');
  }
}
