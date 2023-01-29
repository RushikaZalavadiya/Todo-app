import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-favourite",
  templateUrl: "./favourite.page.html",
  styleUrls: ["./favourite.page.scss"],
})
export class FavouritePage implements OnInit, OnDestroy {
  public favTask = [];
  public subscription: Subscription;
  constructor(
    private _todoService: TodoService,
    public navCtrl: NavController,
    private _authService:AuthService
  ) {}

  ngOnInit() {
    this.subscription = this._todoService.task().subscribe((data) => {
      this.favTask = data.filter((task) => task.isFav);
    });
    this._authService.logEvent('Favourite Page');
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
