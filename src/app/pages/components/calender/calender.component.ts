import { AlertsService } from './../../../core/services/alerts/alerts.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../../services/home.service';
import * as moment from 'moment';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  selectedDate: Date = new Date();
  schedulerEvents: any = [];
  isLoadingEvents: boolean = false;

  // minDate: any = new Date();
  showDetailss = false;

  constructor(
    private alertsService: AlertsService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getSchedularEvents();
  }

  onDateChange(event: any): void {
    let formateDate: any;
    this.selectedDate = event;
    formateDate = moment(new Date(event))?.format("YYYY-MM-DD");
    this.getSchedularEvents();
  }

  onCellClick(e: any): void {
    console.log('Cell clicked:', e);
    this.showDetailss = true
  }

  getSchedularEvents(): any {
    this.isLoadingEvents = true;
    this.homeService?.getSchedularEvents()?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.schedulerEvents = res?.data ? res?.data : [];
          this.isLoadingEvents = false;
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingEvents = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingEvents = false;
      });
    this.cdr?.detectChanges();
    let arr: any = [
      {
        "TaskID": 90,
        "OwnerID": 3,
        "Title": "Website upload",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-06T08:00:00.000Z",
        "End": "2023-06-06T09:00:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": null,
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 91,
        "OwnerID": 2,
        "Title": "Meeting with marketing guys",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-06T05:00:00.000Z",
        "End": "2023-06-06T06:00:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": null,
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 92,
        "OwnerID": 3,
        "Title": "Meeting with Internet provider",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-07T07:30:00.000Z",
        "End": "2023-06-07T08:30:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": null,
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 93,
        "OwnerID": 3,
        "Title": "Bob's Birthday Party",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-08T10:00:00.000Z",
        "End": "2023-06-08T13:30:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": null,
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 95,
        "OwnerID": 2,
        "Title": "Dance Practice",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-03T18:30:00.000Z",
        "End": "2023-06-03T20:00:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": "FREQ=WEEKLY;BYDAY=MO,WE",
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 114,
        "OwnerID": 3,
        "Title": "Software updates",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-04T09:00:00.000Z",
        "End": "2023-06-04T12:00:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": "",
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 115,
        "OwnerID": 1,
        "Title": "Breakfast at Starbucks",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-04T08:00:00.000Z",
        "End": "2023-06-04T09:30:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": "",
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 116,
        "OwnerID": 2,
        "Title": "Performance review",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-04T14:00:00.000Z",
        "End": "2023-06-04T17:00:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": "",
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 118,
        "OwnerID": 1,
        "Title": "HR seminar preparation",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-05T10:00:00.000Z",
        "End": "2023-06-05T12:00:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": "",
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 119,
        "OwnerID": 3,
        "Title": "Helpdesk weekly meeting",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-05T15:00:00.000Z",
        "End": "2023-06-05T16:00:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": "FREQ=WEEKLY;BYDAY=WE",
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },
      {
        "TaskID": 120,
        "OwnerID": 3,
        "Title": "Website upload",
        "Description": "",
        "StartTimezone": null,
        "Start": "2023-06-07T07:00:00.000Z",
        "End": "2023-06-07T08:30:00.000Z",
        "EndTimezone": null,
        "RecurrenceRule": "",
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      }
    ];
    const parseAdjust = (eventDate: string): Date => {
      const currentYear = new Date(eventDate).getFullYear();
      const date = new Date(eventDate);
      date.setFullYear(currentYear);
      return date;
    };

    this.schedulerEvents = arr.map((dataItem: any) => (
      <any>{
        id: dataItem.TaskID,
        start: parseAdjust(dataItem.Start),
        startTimezone: dataItem.startTimezone,
        end: parseAdjust(dataItem.End),
        endTimezone: dataItem.endTimezone,
        isAllDay: dataItem.IsAllDay,
        title: dataItem.Title,
        description: dataItem.Description,
        recurrenceRule: dataItem.RecurrenceRule,
        recurrenceId: dataItem.RecurrenceID,
        recurrenceException: dataItem.RecurrenceException,

        roomId: dataItem.RoomID,
        ownerID: dataItem.OwnerID
      }
    ));

  }
}
