import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  minDate: any = new Date();
  selectedDate: any;

  constructor() { }

  ngOnInit(): void {
  }
  onDateChange(event: any): void {
    let formateDate: any;
    this.selectedDate = event;
    // this.appointmentForm?.get('day')?.patchValue(event);
    // this.appointmentForm?.get('day')?.patchValue(moment(event)?.format('dddd, D MMM yy'))
    formateDate = moment(new Date(event))?.format("YYYY-MM-DD");

  }
}
