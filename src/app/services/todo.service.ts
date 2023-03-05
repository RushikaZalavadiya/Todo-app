import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TaskDetail } from "../interfaces/todo";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  public todos = [];
  public deletedTodo = [];
  private _todos$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public _newtodos$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  public todoCollection = "Todo";
  constructor() {
    this.getAdminTodos()
  }

  addTodo(todo: TaskDetail) {
    return firebase.firestore().collection(this.todoCollection).add(todo);
  }

  getTodos(uid: string, todos) {
    return firebase
      .firestore()
      .collection(this.todoCollection)
      .where("uid", "==", uid)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          isDeleted: doc.data().isDeleted,
          ...doc.data(),
        }));

        console.log("user data", data);
        this.todos = data.filter((todo) => todo.isDeleted == false);

        todos(this.todos);
        this._todos$.next(data);
      });
  }
  getAdminTodos() {
    return firebase.firestore().collection(this.todoCollection).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);

      this._newtodos$.next(data)
    })
  }
  task(): Observable<TaskDetail[]> {
    return this._newtodos$.asObservable();
  }

  markAsComplete(id: string, todo: TaskDetail) {
    if (this.todos.filter((task) => task.id == id)) {
      todo.isCompleted = !todo.isCompleted;
    }
    return firebase
      .firestore()
      .collection(this.todoCollection)
      .doc(id)
      .update(todo);
  }

  markAsFavourite(id: string, todo: TaskDetail) {
    console.log(this.todos);
    if (this.todos.filter((task) => task.id == id)) {
      todo.isFav = !todo.isFav;
    }
    return firebase
      .firestore()
      .collection(this.todoCollection)
      .doc(id)
      .update(todo);
  }

  deleteTodo(id: string, todo: TaskDetail) {
    if (this.todos.filter((task) => task.id == id)) {
      todo.isDeleted = !todo.isDeleted;
    }
    return firebase
      .firestore()
      .collection(this.todoCollection)
      .doc(id)
      .update(todo);
  }
}
