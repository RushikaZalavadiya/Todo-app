import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController, PopoverController, ToastController } from "@ionic/angular";
import { TaskDetail } from "src/app/interfaces/todo";
import { AuthService } from "src/app/services/auth.service";
import { TodoService } from "src/app/services/todo.service";
import { DateTimeComponent } from "../date-time/date-time.component";
import { USER_ID } from "src/app/constants/commonKeys";
import { AdmobAds } from "capacitor-admob-ads";
import { LocalNotifications } from "@capacitor/local-notifications";

type PriorityTypes =
  | "High Priority"
  | "Medium Priority"
  | "Low Priority"
  | "Very Low Priority";

@Component({
  selector: "app-add-task-modal",
  templateUrl: "./add-task-modal.component.html",
  styleUrls: ["./add-task-modal.component.scss"],
})
export class AddTaskModalComponent implements OnInit {
  type: string;
  public selectedDate;
  public reminderTime: any;
  public taskPriority: PriorityTypes = "High Priority";
  public taskList = [];
  public uid: string;
  public inputTask: FormGroup;
  public visiorId: any;
  public todayDate
  constructor(
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private _todoService: TodoService,
    private _authService: AuthService,
    public toast: ToastController
  ) { }

  ngOnInit() {
    console.log(this.type);
    this.visiorId = localStorage.getItem(USER_ID.deviceId);
    console.warn(this.visiorId)
    this.inputTask = new FormGroup({
      name: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required)
    });
    setTimeout(() => {
      this.loadinterad();
    }, 1000);
  }

  changeStyle(priority: PriorityTypes) {
    this.taskPriority = priority;
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

  async addTask() {

    let id = localStorage.getItem(USER_ID.uid);
    this._authService._user$.subscribe((user) => {
      console.log(user);
      if (user !== null) {
        this.uid = user.uid;
      } else {
        this.uid = id;
      }
    });
    this.todayDate = new Date().getDate();

    if (this.todayDate > new Date(this.selectedDate).getDate()) {
      const toast = this.toast.create({ message: "Please select valid date", duration: 2000 });
      (await toast).present();
      this.selectedDate = ''
      return;
    }
    const taskDetail: TaskDetail = {
      uid: this.uid,
      name: this.inputTask.controls["name"].value,
      category: this.inputTask.controls["category"].value,
      date: this.selectedDate,
      priority: this.taskPriority,
      isCompleted: false,
      isFav: false,
      isDeleted: false,
    };
    this.time(taskDetail);
    if (this.inputTask.valid) {
      if (this.type == 'Visitor') {

        this.showinterad();
        this._todoService
          .addVisitorTodo(taskDetail, this.visiorId)
          .then((res) => {
            console.warn(res)
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this._todoService
          .addTodo(taskDetail, id)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      return false;
    }

    return this.modalCtrl.dismiss(taskDetail, "confirm");
  }

  async showinterad() {
    await AdmobAds.showInterstitialAd();
  }
  loadinterad() {
    AdmobAds.loadInterstitialAd({
      adId: 'ca-app-pub-3940256099942544/1033173712',
      isTesting: true
    }).then(() => {
      console.log("ad load.")
    }).catch((err) => {
      console.log(err.message)
    })
  }

  async time(taskDetail) {
    console.log(new Date(this.selectedDate))
    let dateSelected = this.selectedDate;
    console.log('date sekected ===>', dateSelected);

    const t = dateSelected.toString().split('T');
    console.log(t);

    const d = t[0] + 'T' + this.reminderTime
    console.log('final datae    => ', d);


    await LocalNotifications.schedule({
      notifications: [{
        id: Math.random(),
        title: `Your task due time over now.`,
        body: taskDetail.name,
        schedule: {
          at: new Date(d),
          repeats: true,
        },
        smallIcon: 'todo'
      }]
    })
  }
}
