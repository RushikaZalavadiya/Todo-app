import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth.service';

const IMAGE_DIR = 'stored-images';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image;
  user = {
    email: ''
  };
  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public auth: AuthService
  ) { }

  ionViewWillEnter() {
    this.auth._user$.subscribe((res) => {
      console.log(res.user);
      if (res) {
        this.user.email = res.user.email;
      }
    })
  }
  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('Profile')) || [];
    console.log(data);

    this.image = data;
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });

    this.image = image;
    console.log(image);
  }
  async save() {
    const toast = await this.toastCtrl.create({ message: 'Profile saved.', duration: 2000, color: 'success' });
    toast.present();
    localStorage.setItem('Profile', JSON.stringify(this.image));
  }
}
