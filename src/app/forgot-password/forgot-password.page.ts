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
      // console.log(data)
    }).catch((Err) => {
      console.log(Err)
    })
    console.log(this.email)


  }

  presentToast(arg0: string, arg1: string, arg2: number) {
    throw new Error('Method not implemented.');
  }
}
