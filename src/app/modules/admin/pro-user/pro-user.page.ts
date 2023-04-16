import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular/providers/menu-controller';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-pro-user',
  templateUrl: './pro-user.page.html',
  styleUrls: ['./pro-user.page.scss'],
})
export class ProUserPage implements OnInit {
  todoList: any = [];
  newList: any = [];
  id: any
  constructor(public _todo: TodoService, public router: Router) { }

  ngOnInit() {
    this._todo.getProadminTodo().then((res) => {
      console.log(res)
      res.forEach((item) => {
        console.log(item.id);
        this._todo.getProNewadminTodo(item.id).then((res) => {
          this.todoList = res.docs.map((item) => item.data());
          console.log(this.todoList)
          this.newList.push(this.todoList);
          console.log(this.newList)
        })
      })
    })
    // this._todo.getAdminVisitorTodo().then((res) => {
    //   console.log(res.forEach((item) => {
    //     console.log(item.data());
    //     console.log(item.id);
    //     // this.id = item.id;
    //     this._todo.getNewadminTodo(item.id).then((res) => {
    //       this.todoList = res.docs.map((item) => item.data());
    //       console.log(this.todoList)
    //       // console.log())
    //       console.log(this.newList)
    //       this.newList.push(this.todoList);
    //       console.log(this.newList)
    //     })
    //   }))
    // })
    // console.log(this.newList)

  }


  logout() {
    this.router.navigate(['/landing']);
  }

}
