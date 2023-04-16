import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ans',
  templateUrl: './ans.component.html',
  styleUrls: ['./ans.component.scss'],
})
export class AnsComponent implements OnInit {
  que: any;
  constructor() { }

  ngOnInit() {
    console.log(this.que);

  }

}
