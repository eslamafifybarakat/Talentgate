import { AlertsService } from './../../../core/services/alerts/alerts.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../services/home.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
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
  mousePostion: { x: any, y: any } = { x: 0, y: 0 }
  @ViewChild("boxdetails") boxDetails: ElementRef<HTMLDivElement> = {} as ElementRef<HTMLDivElement>
  // minDate: any = new Date();
  showDetailss = false;
  showTargetId: any;
  interviewDetails: any;

  constructor(
    private alertsService: AlertsService,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.onDateChange(new Date());
    window.addEventListener("mousedown", (event: MouseEvent) => {

      this.mousePostion.x = event.clientX;
      this.mousePostion.y = event.clientY;
    })
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
    this.showTargetId = e.event.id;
    this.homeService.getInterviewDetails(this.showTargetId).subscribe((res: any) => {
      this.interviewDetails = res.data;
      console.log(this.interviewDetails)
    })
    console.log(this.showTargetId)
    this.showDetailss = true
    this.boxDetails.nativeElement.style.top = this.mousePostion.y + "px";
    this.boxDetails.nativeElement.style.left = this.mousePostion.x + "px";
    this.boxDetails.nativeElement.style.display = "block";
  }
  onClose(): void {
    this.boxDetails.nativeElement.style.display = "none";
  }
  getSchedularEvents(date: any): any {
    this.isLoadingEvents = true;
    this.homeService?.getInterviews(date, 0)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.schedulerEvents = res?.data.interviews.map((dataItem: any) => (
            <any>{
              id: dataItem._id,
              start: new Date(this.subtracTHour(dataItem?.interview_date)),
              // startTimezone: null,
              end: dataItem?.interview_endDate ? new Date(this.subtracTHour(dataItem?.interview_endDate)) : new Date(this.subtracTHour(dataItem?.interview_date)),
              // endTimezone: new Date(),
              isAllDay: false,
              title: dataItem.title_interview,
              // description: dataItem.Description,
              // recurrenceRule: dataItem.RecurrenceRule,
              // recurrenceId: dataItem.RecurrenceID,
              // recurrenceException: dataItem.RecurrenceException,

              // roomId: dataItem.RoomID,
              // ownerID: dataItem.OwnerID
            }
          ));;
          console.log(this.schedulerEvents)
          // this.schedulerEvents.forEach((element:any) => {
          //   console.log(element.id)
          //   document.getElementById(element.id)?.addEventListener("click",()=>{
          //     window.alert(element.id)


          //   })
          // });
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

      {
        "TaskID": 92,
        "OwnerID": 3,
        "Title": "Meeting with Internet provider",
        "Description": "",
        "StartTimezone": null,
        "Start": "07:00:00",
        "End": "08:00:00",
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

    // this.schedulerEvents = arr.map((dataItem: any) => (
    //   <any>{
    //     id: dataItem.id,
    //     start: parseAdjust(this.formateDate + 'T' + dataItem.start_date + '.000Z'),
    //     // startTimezone: dataItem.startTimezone,
    //     // end: parseAdjust(this.formateDate + 'T' + dataItem.End + '.000Z'),
    //     // endTimezone: dataItem.endTimezone,
    //     // isAllDay: dataItem.IsAllDay,
    //     title: dataItem.title_interview,
    //     // description: dataItem.Description,
    //     // recurrenceRule: dataItem.RecurrenceRule,
    //     // recurrenceId: dataItem.RecurrenceID,
    //     // recurrenceException: dataItem.RecurrenceException,

    //     // roomId: dataItem.RoomID,
    //     // ownerID: dataItem.OwnerID
    //   }
    // ));
    console.log(this.schedulerEvents);

  }
  subtracTHour(date: any): any {
    const originalDate = new Date(date);
    originalDate?.setHours(originalDate?.getHours() - 2);
    const formattedDate: any = originalDate?.toISOString();

    return formattedDate;
  }
}
