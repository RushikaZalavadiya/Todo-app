import { Component, Input, OnInit } from '@angular/core';
import { TaskDetail } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-visitor-fav',
  templateUrl: './visitor-fav.component.html',
  styleUrls: ['./visitor-fav.component.scss'],
})
export class VisitorFavComponent implements OnInit {

  @Input() task: TaskDetail;

  type: string
  constructor(private _todoService: TodoService) { }

  ngOnInit() {
    console.log(this.task)
  }
  ionViewWillEnter() {

  }

  async addToFavourite(task) {
    console.log(task)
    await this._todoService.markAsFavouriteVisitor(task.id, task);
  }

  async deleteTask(task) {
    await this._todoService.deleteTodoasVisitor(task.id, task);
  }

  async markAsComplete(task) {
    await this._todoService.markAsCompleteVisitor(task.id, task);
  }


}
