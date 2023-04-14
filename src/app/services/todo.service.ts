import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TaskDetail, User } from "../interfaces/todo";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { USER_ID } from "../constants/commonKeys";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  public todos = [];
  public visitorTodos = [];
  public deletedTodo = [];
  public _todos$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public _visitorTodo$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public _newtodos$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  id = localStorage.getItem(USER_ID.uid);

  public userCollection = "User";
  public todoCollection = "Todo";
  public visitorCollection = "Visitor";
  public categoryCollection = "Categories";

  constructor() {
  }

  addTodo(todo: TaskDetail, id: string) {
    return firebase.firestore().collection(this.userCollection).doc(id).collection(this.todoCollection).add(todo);
  }

  getTodos(uid, todos) {

    return firebase
      .firestore()
      .collection(this.userCollection).doc(uid).collection(this.todoCollection)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          isDeleted: doc.data().isDeleted,
          ...doc.data(),
        }));

        // console.log("user data", data);
        this.todos = data.filter((todo) => todo.isDeleted == false);

        todos(this.todos);
        this._todos$.next(data);
      });
  }

  addVisitorTodo(todo: TaskDetail, id: string) {
    return firebase.firestore().collection(this.visitorCollection).doc(id).collection(this.todoCollection).add(todo);
  }
  getVisitorTodos(uid, todos) {

    return firebase
      .firestore()
      .collection(this.visitorCollection).doc(uid).collection(this.todoCollection)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          isDeleted: doc.data().isDeleted,
          ...doc.data(),
        }));

        // console.log("user data", data);
        this.visitorTodos = data.filter((todo) => todo.isDeleted == false);

        todos(this.visitorTodos);
        this._visitorTodo$.next(data);
      });
  }

  markAsComplete(id: string, todo: TaskDetail) {
    console.log(todo, id);
    if (this.todos.filter((task) => task.id == id)) {
      todo.isCompleted = !todo.isCompleted;
    }
    console.log(todo, id);

    return firebase
      .firestore()
      .collection(this.userCollection).doc(this.id).collection(this.todoCollection)
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
      .collection(this.userCollection).doc(this.id).collection(this.todoCollection)
      .doc(id)
      .update(todo);
  }

  deleteTodo(id: string, todo: TaskDetail) {
    if (this.todos.filter((task) => task.id == id)) {
      todo.isDeleted = !todo.isDeleted;
    }
    return firebase
      .firestore()
      .collection(this.userCollection).doc(this.id).collection(this.todoCollection)
      .doc(id)
      .update(todo);
  }
}
