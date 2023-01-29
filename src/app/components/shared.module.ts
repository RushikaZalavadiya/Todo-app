import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";
import { AddTaskModalComponent } from "./add-task-modal/add-task-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateTimeComponent } from "./date-time/date-time.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { EmptyTaskListComponent } from "./empty-task-list/empty-task-list.component";
import { TaskComponent } from "./task/task.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { TranslateModule } from "@ngx-translate/core";

const COMPONENTS = [
  AddTaskModalComponent,
  DateTimeComponent,
  SigninComponent,
  SignupComponent,
  EmptyTaskListComponent,
  TaskComponent,
  FilterPipe,
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
