export interface TaskDetail {
  uid: string;
  name: string;
  date: Date | string;
  priority: string;
  isCompleted: boolean;
  isFav: boolean;
  isDeleted: boolean;
}
