import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DateTimeComponent } from 'src/app/components/date-time/date-time.component';
import { TodoService } from 'src/app/services/todo.service';
type PriorityTypes =
  | "High Priority"
  | "Medium Priority"
  | "Low Priority"
  | "Very Low Priority";
@Component({
  selector: 'app-pro-user-update',
  templateUrl: './pro-user-update.page.html',
  styleUrls: ['./pro-user-update.page.scss'],
})
export class ProUserUpdatePage implements OnInit {
  public updateItem: any;
  public newId: any;
  public taskPriority: PriorityTypes = "High Priority";
  newDate: any
  selectedDate: any

  constructor(public route: Router, public activeRoute: ActivatedRoute, public todoservie: TodoService, public modalCtrl: ModalController,) { }

  ngOnInit() {
    const item1 = this.activeRoute.snapshot.paramMap.get('id')
    console.log(item1);
    this.newId = item1
    this.todoservie._todos$.subscribe((res) => {
      console.log(res);
      const i = res.find((item => {

        return item.id == item1
      }));
      console.log(i)

      this.updateItem = i;
      this.newDate = this.updateItem.date
      console.warn("dasboard user.....", res)
    })
  }
  changeStyle(priority: PriorityTypes) {
    this.taskPriority = priority;
    this.updateItem.priority = this.taskPriority
  }
  update() {
    console.log("kkk");
    const item = {
      name: this.updateItem.name,
      priority: this.updateItem.priority,
      category: this.updateItem.category
    }
    console.log(this.updateItem.name)
    this.todoservie.updateProuserTod(this.newId).update(item).then((res: any) => {
      console.log(res);
      this.route.navigate(["dashboard"]);

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
}
