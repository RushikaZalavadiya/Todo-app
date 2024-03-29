import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  LoadingController,
  MenuController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { AddTaskModalComponent } from "src/app/components/add-task-modal/add-task-modal.component";
import { DateTimeComponent } from "src/app/components/date-time/date-time.component";
import { USER_ID } from "src/app/constants/commonKeys";
import { TaskDetail } from "src/app/interfaces/todo";
import { AuthService } from "src/app/services/auth.service";
import { TodoService } from "src/app/services/todo.service";

type SegmentTypes = "all" | "complete" | "incomplete";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  public selectedDate: Date;
  public segmentValue: SegmentTypes = "all";
  public todos: TaskDetail[] = [];
  public profile: any;
  constructor(
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    private _todoService: TodoService,
    private _authService: AuthService,
    private router: Router,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.selectedDate = new Date();
    this.getTodos();
    this.profile = JSON.parse(localStorage.getItem(USER_ID.profile));
    console.log(this.profile);
  }
  ionViewWillEnter() {
    this.getData();
  }
  async getData() {
    const loading = await this.loadingCtrl.create({ message: 'Loading...' });
    loading.present();
    this._authService.getUserProfile().then((res) => {
      loading.dismiss();
      this.profile = res.data();
    })
  }
  getTodos() {
    this._authService._user$.subscribe((user) => {
      // console.log(user?.uid);
      this.allTask(user?.uid);
    });
  }

  async openDatePicker() {
    let dateModal = await this.modalCtrl.create({
      component: DateTimeComponent,
      initialBreakpoint: 0.5,
    });
    dateModal.present();
    let { data, role } = await dateModal.onDidDismiss();

    if (role == "confirm") {
      this.selectedDate = data;
    }
  }

  allTask(uid: string) {
    // this._todoService.getTodos() 
    this._todoService.getTodos(uid, (data) => {
      console.warn(data)
      this.todos = data.filter(
        (task) =>
          new Date(task.date).setHours(0, 0, 0, 0) ===
          new Date(this.selectedDate).setHours(0, 0, 0, 0)
      );
      // console.log(this.todos);
    });
  }

  async changeDate() {
    await this.openDatePicker();
    this.getTodos();
  }

  nextDate() {
    this.selectedDate = new Date(
      this.selectedDate.setDate(this.selectedDate.getDate() + 1)
    );
    this.getTodos();
  }

  previousDate() {
    this.selectedDate = new Date(
      this.selectedDate.setDate(this.selectedDate.getDate() - 1)
    );
    this.getTodos();
  }

  async openMenu() {
    await this.menuCtrl.open();
  }

  async openAddTaskModal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskModalComponent,
      cssClass: "modal-border",
      initialBreakpoint: 0.80
    });
    modal.present();
  }

  async logout() {
    await this._authService.signOut();
    this.router.navigate(["landing"]);
    localStorage.removeItem(USER_ID.uid);
    localStorage.removeItem(USER_ID.profile);
  }
}
