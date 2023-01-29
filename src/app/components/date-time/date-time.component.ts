import { Component, OnInit, ViewChild } from "@angular/core";
import { IonDatetime, ModalController } from "@ionic/angular";

@Component({
  selector: "app-date-time",
  templateUrl: "./date-time.component.html",
  styleUrls: ["./date-time.component.scss"],
})
export class DateTimeComponent implements OnInit {
  @ViewChild("datetime") dateTimeCmp: IonDatetime;

  public selectedDate: Date;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  async change() {
    await this.dateTimeCmp.confirm();

    return this.modalCtrl.dismiss(this.selectedDate, "confirm");
  }
}
