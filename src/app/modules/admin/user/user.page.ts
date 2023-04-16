import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public regUser: any = []
  constructor(public auth: TodoService, public loading: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loading.create({ message: 'loading...', duration: 2000 });
    loading.present();
    this.auth.getRegUser().then((res) => {
      res.forEach((data) => {
        loading.dismiss();
        this.regUser.push(data.data())
      })
    })

  }

}
