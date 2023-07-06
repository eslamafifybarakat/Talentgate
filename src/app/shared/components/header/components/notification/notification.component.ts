import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HomeService } from 'src/app/pages/services/home.service';

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
  notifications: any;
  hoursDiff: number= 0;
  hoursDiffArray: any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.numberOfUnreadnot();
    this.getNotification()
  }

  getNotification()
  {
    this.homeService.getNotification(0).subscribe((res)=>{
      console.log(res);
      this.notifications= res.data.notifications;
      let now = new Date();
      this.hoursDiffArray = [];
      for (let i = 0; i < this.notifications.length; i++) {
        let apiTime = new Date(this.notifications[i].time);
        let diff = Math.abs(now.getTime() - apiTime.getTime());
        this.hoursDiff = Math.floor(diff / (1000 * 60 * 60));
        this.hoursDiffArray.push(this.hoursDiff);
        console.log("فرق التوقيت:", this.hoursDiff, "ساعة");
      }
    })
  }
  numberOfUnreadnot() {
    this.allNotifications.forEach((e) => {
      if (e.seen == 'unread') {
        this.count += 1;
      }
    })
  }
}
