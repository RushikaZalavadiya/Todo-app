import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-visitor-archive',
  templateUrl: './visitor-archive.page.html',
  styleUrls: ['./visitor-archive.page.scss'],
})
export class VisitorArchivePage implements OnInit {

  public deletedTask = [];
  public subscription: Subscription;
  constructor(private _todoService: TodoService, private _authService: AuthService) { }

  ngOnInit() {

    this.subscription = this._todoService._visitorTodo$.subscribe((data) => {
      this.deletedTask = data.filter((task) => task.isDeleted);

    })

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
