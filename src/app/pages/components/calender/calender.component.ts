import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
// import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { SchedulerEvent } from "@progress/kendo-angular-scheduler";
import { sampleData, displayDate } from "./events-utc";
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  public selectedDate: Date = displayDate;
  public events: any[] = sampleData;

  @ViewChild('fullcalendar') fullcalendar!: any;
  minDate: any = new Date();
  // selectedDate: any;
  showDetailss = false;
  resources: any[] = [
    {
      name: "Rooms",
      data: [
        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
        { text: "Meeting Room 201", value: 2, color: "#f58a8a" },
      ],
      field: "roomId",
      valueField: "value",
      textField: "text",
      colorField: "color",
    },
  ];
  // public events: SchedulerEvent[] = [
  //   {
  //     id: 1,
  //     title: 'Event 1',
  //     start: new Date('2023-06-04T10:00:00'),
  //     end: new Date('2023-06-04T11:30:00'),
  //     description: 'Event 1 details...'
  //   },
  //   // Add more events as needed
  // ];
  Events: any[] = [
    {
      title: 'event 1', start: '2023-05-24T11:30:00',
      end: '2023-05-26T11:30:00', color: '#ef305e', classNames: ['event-style']
    },
    {
      title: 'event 2', start: '2022-11-09T10:30:00',
      end: '2022-11-11T11:30:00', color: '#ef305e'
    },
    {
      title: 'event 2', start: '2022-11-25T10:30:00',
      end: '2022-11-26T11:30:00', color: '#ef305e'
    },
  ];
  anys: any[] = [
    {
      title: 'event 1', start: '2023-05-24T11:30:00',
      end: '2023-05-24T11:30:00', color: '#ef305e'
    },
    {
      title: 'event 2', start: '2022-11-09T10:30:00',
      end: '2022-11-11T11:30:00', color: '#ef305e'
    },
    {
      title: 'event 2', start: '2022-11-25T10:30:00',
      end: '2022-11-26T11:30:00', color: '#ef305e'
    },
  ];
  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: this.Events
  };
  constructor(private httpClient: HttpClient) { }
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  ngOnInit() {
    // this.fullcalendar.plugins  = [dayGridPlugin];
    console.log(this.fullcalendar);

    setTimeout(() => {
      this.calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events,
      };
    }, 2500);
  }
  onDateChange(event: any): void {
    let formateDate: any;
    this.selectedDate = event;
    // this.appointmentForm?.get('day')?.patchValue(event);
    // this.appointmentForm?.get('day')?.patchValue(moment(event)?.format('dddd, D MMM yy'))
    formateDate = moment(new Date(event))?.format("YYYY-MM-DD");

  }
  showDetails(dataItem: any) {
    dataItem.showDetails = true;
    console.log(dataItem);

  }

  hideDetails(dataItem: any) {
    dataItem.showDetails = false;
  }



  onCellClick(e: any): void {
    console.log('Cell clicked:', e); // Handle cell click event
    this.showDetailss = true
  }

  onEventMouseEnter(e: any): void {
    console.log('Event mouse enter:', e); // Handle event mouse enter event
  }

  onEventMouseLeave(e: any): void {
    console.log('Event mouse leave:', e); // Handle event mouse leave event
  }

  public hoveredEvent: any = null;
  public clickedEvent: any = null;

  isEventHovered(eventData: any): boolean {
    return this.hoveredEvent === eventData;
  }

  isEventClicked(eventData: any): boolean {
    return this.clickedEvent === eventData;
  }

  // onEventMouseEnter(eventData: any): void {
  //   this.hoveredEvent = eventData;
  // }

  // onEventMouseLeave(eventData: any): void {
  //   this.hoveredEvent = null;
  // }

  // onCellClick(eventData: any): void {
  //   this.clickedEvent = eventData;
  // }
}
