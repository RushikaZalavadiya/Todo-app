import { Component, Input, OnInit } from "@angular/core";
import { TaskDetail } from "src/app/interfaces/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
  @Input() task: TaskDetail;

  constructor(private _todoService: TodoService) {}

  ngOnInit() {}

  async addToFavourite(task) {
    await this._todoService.markAsFavourite(task.id, task);
  }

  async deleteTask(task) {
    await this._todoService.deleteTodo(task.id, task);
  }

  async markAsComplete(task) {
    await this._todoService.markAsComplete(task.id, task);
  }
}
