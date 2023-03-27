import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(public router: Router, public auth: AuthService, public stripe: StripeService) { }

  ngOnInit() {

  }
  continue() {
    let id = this.create_UUID();
    this.auth.visitorUser();
    this.router.navigate(['dashboard']);
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

  subscribe(id: string) {
    this.stripe.getPlan(id).subscribe((res) => {
      console.log(res);
    })
    this.router.navigate(['/email-signup'], { state: { id: id } });
  }
}
