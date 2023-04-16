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
  public _regUser$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public _newtodos$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  id = localStorage.getItem(USER_ID.uid);
  visitorCapId = localStorage.getItem(USER_ID.deviceId);

  public userCollection = "User";
  public todoCollection = "Todo";
  public visitorCollection = "Visitor";

  constructor() {
  }

  addTodo(todo: TaskDetail, id: string) {
    return firebase.firestore().collection(this.userCollection).doc(id).collection(this.todoCollection).add(todo);
  }
  addRegUser(item: any) {
    return firebase.firestore().collection('Register User').add(item);

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
  getVisitorTodos(uid, todos?) {

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
  getAdminVisitorTodo() {
    return firebase
      .firestore()
      .collection(this.visitorCollection).get()
  }
  getNewadminTodo(uid: any) {
    return firebase
      .firestore()
      .collection(this.visitorCollection).doc(uid).collection(this.todoCollection).get()
  }
  getProadminTodo() {
    return firebase
      .firestore()
      .collection(this.userCollection).get()
  }
  getProNewadminTodo(uid: any) {
    return firebase
      .firestore()
      .collection(this.userCollection).doc(uid).collection(this.todoCollection).get()
  }

  getRegUser() {
    return firebase
      .firestore()
      .collection('Register User').get()
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
  markAsCompleteVisitor(id: string, todo: TaskDetail) {
    console.log(todo, id);
    if (this.todos.filter((task) => task.id == id)) {
      todo.isCompleted = !todo.isCompleted;
    }
    console.log(todo, id);

    return firebase
      .firestore().
      collection(this.visitorCollection).doc(this.visitorCapId).collection(this.todoCollection).doc(id)
      .update(todo);
  }
  markAsFavourite(id: string, todo: TaskDetail) {
    console.warn(id)

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
  markAsFavouriteVisitor(id: string, todo: TaskDetail) {
    console.log(id)
    console.log(this.todos);
    if (this.todos.filter((task) => task.id == id)) {
      todo.isFav = !todo.isFav;
    }
    return firebase
      .firestore().
      collection(this.visitorCollection).doc(this.visitorCapId).collection(this.todoCollection).doc(id)
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


  deleteTodoasVisitor(id: string, todo: TaskDetail) {
    if (this.todos.filter((task) => task.id == id)) {
      todo.isDeleted = !todo.isDeleted;
    }
    return firebase
      .firestore()
      .collection(this.visitorCollection).doc(this.visitorCapId).collection(this.todoCollection)
      .doc(id)
      .update(todo);
  }


}
