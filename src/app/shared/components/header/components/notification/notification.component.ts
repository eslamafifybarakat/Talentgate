import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  unreadedNotification: number = 3;
  collapse: boolean = false;
  allNotifications = [
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment(), seen: "read" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-09-01T12:58:24+02:00'), seen: "unread" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-08-01T12:58:24+02:00'), seen: "unread" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-07-01T12:58:24+02:00'), seen: "read" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-06-01T12:58:24+02:00'), seen: "unread" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-09-01T12:58:24+02:00'), seen: "read" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-09-01T12:58:24+02:00'), seen: "read" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-09-01T12:58:24+02:00'), seen: "unread" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-09-01T12:58:24+02:00'), seen: "read" },
    { img: "../../../../../../assets/images/home/person.jpg", text: "Lorem ipsum dolor sit amet conse ctetur adipisicing elit. Maxime etnihil cum eum facilis accusamus", createdAt: moment('2022-09-01T12:58:24+02:00'), seen: "read" },
  ];
  count = 0;
  activeCategory: any;

  constructor() { }

  ngOnInit(): void {
    this.numberOfUnreadnot()
  }
  numberOfUnreadnot() {
    this.allNotifications.forEach((e) => {
      if (e.seen == 'unread') {
        this.count += 1;
      }
    })
  }
}
