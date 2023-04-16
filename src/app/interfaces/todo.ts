export interface TaskDetail {
  uid: string;
  name: string;
  date: Date | string;
  priority: string;
  category: Category;
  isCompleted: boolean;
  isFav: boolean;
  isDeleted: boolean;
}
export interface User {
  email?: string;
  id?: string;
  type?: string;
  profile?: string;
  username?: string;
  gender?: string;
  city?: string
}
export enum Category {
  all = 'All',
  work = "Work",
  personal = 'Personal',
  birthday = 'Birthday'
}