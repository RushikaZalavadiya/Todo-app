import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ToastController } from '@ionic/angular';
import { AdmobAds, BannerPosition, BannerSize } from 'capacitor-admob-ads';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  selectedDate: any
  date: any;
  datePipe: any;
  localNotifications: any;
  constructor(public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async preserntToas(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      mode: 'ios',
      position: 'top',
      color: 'success'
    })
    toast.present()
  }
  //a show kare chhe banner add ne.....
  // showbaaner() {
  //   AdmobAds.showBannerAd({
  //     adId: "ca-app-pub-3940256099942544/6300978111", isTesting: true,
  //     adSize: BannerSize.BANNER, adPosition: BannerPosition.BOTTOM
  //   }).then(() => {
  //     console.log('Banner Ad Shown');
  //     this.preserntToas("banner AD shown")
  //   }).catch(err => {
  //     console.log(err.message);
  //     this.preserntToas(err.message)
  //   });

  // }
  //a hide kare chhe banner ad ne....
  // hidebanner() {
  //   AdmobAds.hideBannerAd().then(() => {
  //     console.log('Banner Ad Hidden')
  //     this.preserntToas("Hidden")

  //   }).catch(err => {
  //     console.log(err.message);
  //     this.preserntToas("banner AD Hidden")

  //   });

  // }

  //a chhe ne resume kare chhe banner ad ne
  // resumebanner() {
  //   AdmobAds.resumeBannerAd().then(() => {
  //     console.log('Banner Ad Resumed');
  //   }).catch(err => {
  //     console.log(err.message);
  //   });

  // }
  //a chhe ne remove kare chhe banner ad ne
  // removebannerad() {
  //   AdmobAds.removeBannerAd().then(() => {
  //     console.log('Banner Ad Removed');
  //   }).catch(err => {
  //     console.log(err.message);
  //   });

  // }
  loadinterad() {
    AdmobAds.loadInterstitialAd({
      adId: 'ca-app-pub-3940256099942544/1033173712',
      isTesting: true
    }).then(() => {
      this.preserntToas("ad load.")
    }).catch((err) => {
      this.preserntToas(err.message)
    })
  }
  showinterad() {
    AdmobAds.showInterstitialAd().then(() => {
      this.preserntToas("......");
    }).catch((err) => {
      this.preserntToas(err.message)
    })
  }
  Reminder() {
    console.log(this.selectedDate)
  }
  async scheduleMorningReminder() {
    // let year = new Date().getFullYear();
    // let month = new Date().getMonth();
    // let day = new Date().getDate();

    // let time1 = new Date(year, month, day, 7, 5, 0);
    // console.log(time1)
    // let time2 = new Date(year, month, day, 12, 0, 0);

    await LocalNotifications.schedule({
      notifications: [{
        id: 1,
        title: 'a...............',
        body: 'aaaaa',
        schedule: {
          at: this.selectedDate,
          repeats: true,
        },

      }]
    })
    // await LocalNotifications.schedule({  
    //   notifications: [
    //     {
    //       id: 1,
    //       title: 'My first notification',
    //       trigger: { at: new Date(time1) },
    //       data: { "id": 1, "name": "Mr. A" }
    //     },
    //     {
    //       id: 2,
    //       title: 'My Second notification',
    //       trigger: { at: new Date(time2) },
    //       data: { "id": 2, "name": "Mr. B" },

    //     }
    //   ]
    // })

  }
  async time() {
    let todayDate = new Date();
    console.log('t', todayDate);
    let dateSelected = new Date(this.selectedDate)
    console.log('s', this.selectedDate);

    if (todayDate.getDate() > dateSelected.getDate()) {
      this.preserntToas("please selected valid date")
      console.log("plaese slected valid date");
    }
    else {
      dateSelected = this.selectedDate
      console.log("valid date.....");
    }
    await LocalNotifications.schedule({
      notifications: [{
        id: 1,
        title: 'Reminder....',
        body: 'reminder.....  ',
        schedule: {
          at: new Date(dateSelected),
          repeats: true,
        },

      }]
    })
  }
}
