import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  todoList: any = []
  constructor(private menuController: MenuController, public _todo: TodoService) { }

  ngOnInit() {
    this._todo.task().subscribe((res) => {
      console.log('res...', res)
      this.todoList = res
    })
  }

  async openMenu() {
    await this.menuController.open();
  }

}
