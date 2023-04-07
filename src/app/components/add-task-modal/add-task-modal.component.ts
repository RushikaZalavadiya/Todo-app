import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController, PopoverController } from "@ionic/angular";
import { TaskDetail } from "src/app/interfaces/todo";
import { AuthService } from "src/app/services/auth.service";
import { TodoService } from "src/app/services/todo.service";
import { DateTimeComponent } from "../date-time/date-time.component";
import { USER_ID } from "src/app/constants/commonKeys";

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
  public selectedDate: Date;
  public taskPriority: PriorityTypes = "High Priority";
  public taskList = [];
  public uid: string;
  public inputTask: FormGroup;
  constructor(
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    private _todoService: TodoService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.inputTask = new FormGroup({
      name: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required)
    });
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

  addTask() {
    let id = localStorage.getItem(USER_ID.uid);
    this._authService._user$.subscribe((user) => {
      console.log(user);
      this.uid = user.uid;
    });

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
    if (this.inputTask.valid) {
      this._todoService
        .addTodo(taskDetail, id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return false;
    }

    return this.modalCtrl.dismiss(taskDetail, "confirm");
  }
}
