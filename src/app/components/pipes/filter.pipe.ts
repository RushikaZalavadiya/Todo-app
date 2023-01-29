import { Pipe, PipeTransform } from "@angular/core";
import { TaskDetail } from "src/app/interfaces/todo";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(
    value: TaskDetail[],
    isCompleted: boolean,
    ...args: unknown[]
  ): unknown {
    if (isCompleted) {
      const length = value.filter((todo) => todo.isCompleted).length;
      return length || null;
    } else {
      const length = value.filter((todo) => !todo.isCompleted).length;
      return length || null;
    }
  }
}
