import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ModalController, ToastController } from '@ionic/angular';
import { AdmobAds, BannerPosition, BannerSize } from 'capacitor-admob-ads';
import { DateTimeComponent } from 'src/app/components/date-time/date-time.component';
import { TodoService } from 'src/app/services/todo.service';

type PriorityTypes =
  | "High Priority"
  | "Medium Priority"
  | "Low Priority"
  | "Very Low Priority";

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
  updateItem: any;
  public newId: any;
  newDate: any;

  public taskPriority: PriorityTypes = "High Priority";

  constructor
    (public toastCtrl: ToastController, public activeroute: ActivatedRoute, public todoservie: TodoService, public route: Router, public modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    const item1 = this.activeroute.snapshot.paramMap.get('id')
    console.log(item1);
    this.newId = item1

    this.todoservie._visitorTodo$.subscribe((res) => {
      console.log(res);
      // console.log(item)
      const i = res.find((item => {

        return item.id == item1
      }));
      console.log(i)
      this.updateItem = i
      this.newDate = this.updateItem.date
      console.warn("dasboard user.....", res)

    })
  }
  changeStyle(priority: PriorityTypes) {
    this.taskPriority = priority;
    this.updateItem.priority = this.taskPriority
  }
  update() {
    const item = {
      name: this.updateItem.name,
      priority: this.updateItem.priority,
      category: this.updateItem.category,
      date: this.selectedDate ? this.selectedDate : this.newDate
    }
    console.log(this.updateItem.name)
    this.todoservie.updateVisitorTod(this.newId).update(item).then((res) => {
      console.log(res);
      this.preserntToas("Updated sucessfully.....")
      this.route.navigate(["dashboard-visitor"]);

    })

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


  }
  async openDatePicker() {
    let dateModal = await this.modalCtrl.create({
      component: DateTimeComponent,
      initialBreakpoint: 0.5,
    });

    dateModal.present();
    let { data, role } = await dateModal.onWillDismiss();
    console.log(data, role);

    if (role == "confirm") {
      this.selectedDate = data;
    }
    console.log(this.selectedDate);
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
