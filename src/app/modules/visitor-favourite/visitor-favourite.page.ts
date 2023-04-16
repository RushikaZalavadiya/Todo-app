import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { USER_ID } from 'src/app/constants/commonKeys';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-visitor-favourite',
  templateUrl: './visitor-favourite.page.html',
  styleUrls: ['./visitor-favourite.page.scss'],
})
export class VisitorFavouritePage implements OnInit {
  public favTask = [];
  visitorCapId = localStorage.getItem(USER_ID.deviceId);
  flag = false
  public subscription: Subscription;
  constructor(
    private _todoService: TodoService,
    public navCtrl: NavController,
    private _authService: AuthService
  ) { }

  ngOnInit() {




    this._todoService._visitorTodo$.subscribe((res) => {
      console.log(res)
      this.flag = true
      this.favTask = res.filter((task) => task.isFav);
      console.log(this.favTask);
      console.warn("dasboard user.....", this.favTask)

    })
    console.log('fav...');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goBack() {
    this.navCtrl.back({
      animated: true,
      animationDirection: "back",
    });
  }

}
