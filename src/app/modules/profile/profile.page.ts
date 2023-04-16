import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FaqComponent } from 'src/app/components/faq/faq.component';
import { User } from 'src/app/interfaces/todo';
import { USER_ID } from 'src/app/constants/commonKeys';

const IMAGE_DIR = 'stored-images';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: FormGroup;
  image;

  user: User
  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public auth: AuthService,
    public modal: ModalController
  ) { }

  ionViewWillEnter() {
    this.getData();
  }
  ngOnInit() {
    this.profile = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', []),
      gender: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      profile: new FormControl('', [])
    })
  }
  async getData() {
    const loading = await this.loadingCtrl.create({ message: 'Loading...' });
    loading.present();
    this.auth.getUserProfile().then((res) => {
      console.log(res.data());
      this.user = res.data();
      loading.dismiss();
      this.profile.get('name').setValue(res.data().name);
      this.profile.get('email').setValue(res.data().email);
      this.profile.get('gender').setValue(res.data().gender);
      this.profile.get('city').setValue(res.data().city);
      this.image = res.data().profile;
    })
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
    this.image = image.dataUrl
    console.warn(image);
  }
  async save() {
    if (this.profile.valid) {
      const toast = await this.toastCtrl.create({ message: 'Profile saved.', duration: 2000, color: 'success' });
      toast.present();
      const data = { ...this.profile.value, profile: this.image }
      await this.auth.setRegisteredUSer(data, this.user.id);
      localStorage.setItem(USER_ID.profile, JSON.stringify(data));
    }

  }
  async openHelp() {
    const modal = await this.modal.create({
      component: FaqComponent
    });
    modal.present();
  }
  cancel() {
    return;
  }
}
