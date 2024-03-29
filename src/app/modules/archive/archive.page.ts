import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-archive",
  templateUrl: "./archive.page.html",
  styleUrls: ["./archive.page.scss"],
})
export class ArchivePage implements OnInit, OnDestroy {
  public deletedTask = [];
  public subscription: Subscription;
  constructor(private _todoService: TodoService, private _authService: AuthService) { }

  ngOnInit() {
    this.subscription = this._todoService._todos$.subscribe((data) => {
      this.deletedTask = data.filter((task) => task.isDeleted);
    });
    // this.subscription = this._todoService._visitorTodo$.subscribe((data) => {
    //   this.deletedTask = data.filter((task) => task.isDeleted);

    // })

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
