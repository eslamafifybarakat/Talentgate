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
  formateDate: any;
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
    this.onDateChange(new Date())
  }

  onDateChange(event: any): void {
    this.selectedDate = event;
    this.formateDate = moment(new Date(event))?.format("YYYY-MM-DD");
    this.getSchedularEvents(event);
  }
  handleNavigation(event: any): void {
    this.selectedDate = event?.sender?._selectedDate;
  }
  onCellClick(e: any): void {
    console.log('Cell clicked:', e);
    this.showDetailss = true
  }

  getSchedularEvents(date: any): any {
    this.isLoadingEvents = true;
    this.homeService?.getSchedularEvents(date)?.subscribe(
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
        "Start": "00:00:00",
        "End": "01:00:00",
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
        "Start": "02:00:00",
        "End": "03:00:00",
        "EndTimezone": null,
        "RecurrenceRule": null,
        "RecurrenceID": null,
        "RecurrenceException": null,
        "IsAllDay": false
      },

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
        start: parseAdjust(this.formateDate + 'T' + dataItem.Start + '.000Z'),
        startTimezone: dataItem.startTimezone,
        end: parseAdjust(this.formateDate + 'T' + dataItem.End + '.000Z'),
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
    console.log(this.schedulerEvents);

  }
}
