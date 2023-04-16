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
  constructor(private menuController: MenuController, public _todo: TodoService, public router: Router) { }

  ngOnInit() {
    this._todo._todos$.subscribe((res) => {
      console.log('res...', res);
      this.users = res;
    })
  }

  async openMenu() {
    await this.menuController.open();
  }
  logout() {
    this.router.navigate(['/landing']);
  }
}
