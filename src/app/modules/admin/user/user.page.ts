import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public regUser: any = []
  constructor(public auth: TodoService) { }

  ngOnInit() {
    this.auth.getRegUser().then((res) => {
      console.log(res.forEach((data) => {
        this.regUser.push(data.data())
      }))
    })
  }

}
