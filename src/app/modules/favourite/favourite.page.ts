import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { USER_ID } from "src/app/constants/commonKeys";
import { AuthService } from "src/app/services/auth.service";
import { TodoService } from "src/app/services/todo.service";


@Component({
  selector: "app-favourite",
  templateUrl: "./favourite.page.html",
  styleUrls: ["./favourite.page.scss"],
})
export class FavouritePage implements OnInit, OnDestroy {
  public favTask = [];
  public favTask1 = [];
  visitorCapId = localStorage.getItem(USER_ID.deviceId);
  flag = false
  public subscription: Subscription;
  constructor(
    private _todoService: TodoService,
    public navCtrl: NavController,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this._todoService._todos$.subscribe((data) => {
      this.favTask = data.filter((task) => task.isFav);
      console.warn("dasboard user.....", this.favTask)
    });
    const el = document.getElementById("img");
    console.log(el)
    if (this.favTask1.length > 0) {
      el.style.display = 'none'
    }


    // if (this.favTask.length) {
    //   this.flag = true;
    //   if (this.favTask.length > 0) {
    //     this.flag = false
    //   }
    //   console.log("kk")
    //   console.log(this.flag)
    // }

    // if (this.favTask1.length) {
    //   this.flag = true;
    //   if (this.favTask.length > 0) {
    //     this.flag = true
    //   }
    //   console.log("kk")
    //   console.log(this.flag)
    // }



    this._todoService._visitorTodo$.subscribe((res) => {
      console.log(res)
      this.flag = true
      this.favTask1 = res.filter((task) => task.isFav);
      console.log(this.favTask1);
      console.warn("dasboard user.....", this.favTask1)

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
