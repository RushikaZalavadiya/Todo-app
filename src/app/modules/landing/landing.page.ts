import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_ID } from 'src/app/constants/commonKeys';
import { User } from 'src/app/interfaces/todo';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(public router: Router, public auth: AuthService, public stripe: StripeService, public loading: LoadingService) { }

  ngOnInit() {

  }
  async continue() {
    const user: User = {
      id: this.create_UUID(),
      type: 'Visitor'
    }
    this.auth.addVisitor(user, user.id);
    await this.loading.present('Loading...');
    localStorage.setItem(USER_ID.uid, user.id);
    this.router.navigate(['dashboard-visitor']);
  }
  create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  async subscribe(id: string) {
    // await this.loading.present('Loading...');
    this.stripe.getPlan(id).subscribe((res) => {
      console.log(res);
    })
    this.router.navigate(['/email-signup'], { state: { id: id } });
  }
}
