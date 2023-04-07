import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AdmobAds, BannerPosition, BannerSize } from 'capacitor-admob-ads';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

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
  showbaaner() {
    AdmobAds.showBannerAd({
      adId: "ca-app-pub-3940256099942544/6300978111", isTesting: true,
      adSize: BannerSize.BANNER, adPosition: BannerPosition.BOTTOM
    }).then(() => {
      console.log('Banner Ad Shown');
      this.preserntToas("banner AD shown")
    }).catch(err => {
      console.log(err.message);
      this.preserntToas(err.message)
    });

  }
  //a hide kare chhe banner ad ne....
  hidebanner() {
    AdmobAds.hideBannerAd().then(() => {
      console.log('Banner Ad Hidden')
      this.preserntToas("Hidden")

    }).catch(err => {
      console.log(err.message);
      this.preserntToas("banner AD Hidden")

    });

  }

  //a chhe ne resume kare chhe banner ad ne
  resumebanner() {
    AdmobAds.resumeBannerAd().then(() => {
      console.log('Banner Ad Resumed');
    }).catch(err => {
      console.log(err.message);
    });

  }
  //a chhe ne remove kare chhe banner ad ne
  removebannerad() {
    AdmobAds.removeBannerAd().then(() => {
      console.log('Banner Ad Removed');
    }).catch(err => {
      console.log(err.message);
    });

  }
}
