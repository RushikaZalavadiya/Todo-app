import { Component, Input, OnInit } from "@angular/core";

type SegmentTypes = "all" | "complete" | "incomplete";

@Component({
  selector: "app-empty-task-list",
  templateUrl: "./empty-task-list.component.html",
  styleUrls: ["./empty-task-list.component.scss"],
})
export class EmptyTaskListComponent implements OnInit {
  @Input() src: string;
  @Input() taskInfo: string;
  @Input() review: string;

  constructor() {}

  ngOnInit() {}
}
