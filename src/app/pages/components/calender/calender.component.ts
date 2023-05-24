import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
// import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  @ViewChild('fullcalendar') fullcalendar!: any;
  minDate: any = new Date();
  selectedDate: any;

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
}
