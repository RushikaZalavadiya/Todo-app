import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  users: any = []


  todoList: any = [];
  newList: any = [];
  id: any
  constructor(private menuController: MenuController, public _todo: TodoService, public router: Router) { }

  ngOnInit() {
    this._todo.getAdminVisitorTodo().then((res) => {
      console.log(res.forEach((item) => {
        console.log(item.data());
        console.log(item.id);
        // this.id = item.id;
        this._todo.getNewadminTodo(item.id).then((res) => {
          this.todoList = res.docs.map((item) => item.data());
          console.log(this.todoList)
          // console.log())
          console.log(this.newList)
          this.newList.push(this.todoList);
          console.log(this.newList)
        })
      }))
    })
    console.log(this.newList)

  }

  async openMenu() {
    await this.menuController.open();
  }
  logout() {
    this.router.navigate(['/landing']);
  }
}
