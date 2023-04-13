import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, MenuController, PopoverController } from '@ionic/angular';
import { AddTaskModalComponent } from 'src/app/components/add-task-modal/add-task-modal.component';
import { DateTimeComponent } from 'src/app/components/date-time/date-time.component';
import { USER_ID } from 'src/app/constants/commonKeys';
import { TaskDetail } from 'src/app/interfaces/todo';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TodoService } from 'src/app/services/todo.service';

type SegmentTypes = "all" | "complete" | "incomplete";

@Component({
  selector: 'app-dashboard-visitor',
  templateUrl: './dashboard-visitor.page.html',
  styleUrls: ['./dashboard-visitor.page.scss'],
})
export class DashboardVisitorPage implements OnInit {
  public selectedDate: Date;
  public segmentValue: SegmentTypes = "all";
  public todos: TaskDetail[] = [];

  constructor(
    public modalCtrl: ModalController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    private _todoService: TodoService,
    private _authService: AuthService,
    private router: Router,
    public loading: LoadingService
  ) { }

  ngOnInit() {
    this.selectedDate = new Date();
    this.loading.present('Loading....', 1000);
    this.getTodos();
  }

  getTodos() {
    const id = localStorage.getItem(USER_ID.deviceId);
    this.allTask(id);
    console.log(this.todos);
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
    this._todoService.getVisitorTodos(uid, (data) => {
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
      componentProps: {
        type: 'Visitor'
      }
    });
    modal.present();
  }

  async logout() {
    await this._authService.signOut();
    this.router.navigate(["landing"]);
  }
}
