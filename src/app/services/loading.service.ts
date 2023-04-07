import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})

export class LoadingService {
    constructor(public loadingCtrl: LoadingController) { }

    async present(messege, duration = 3000) {
        const loader = await this.loadingCtrl.create({
            message: messege,
            duration: duration
        })
        loader.present();
    }
    async dismiss() {
        await this.loadingCtrl.dismiss();
    }
}