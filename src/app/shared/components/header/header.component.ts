import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleSideMenu: boolean = false;
  moduleType: string = '';
  @Input() collapsed: boolean = false;
  @Input() screenWidth: any = 0;

  scrollDown: boolean = false;
  @HostListener("window:scroll", ["$event"])
  handleKeyDown() {
    let element = document.querySelector(".navbar") as HTMLElement;
    if (window.pageYOffset > 30) {
      element.classList.add("headerScroll");
      this.scrollDown = true;
    } else {
      element.classList.remove("headerScroll");
      this.scrollDown = false;
    }
  }
  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.sharedService?.urlData?.subscribe((res: any) => {
      this.moduleType = res?.moduleType;
      console.log(this.moduleType);
    })

    // if (window?.innerWidth < 700) {
    //   this.toggleSideMenu = true;
    //   this.sharedService?.showSideMenu?.next(true);
    // }
  }

  getDashClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768 && !this.toggleSideMenu) {
      styleClass = 'dash-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 && !this.toggleSideMenu) {
      styleClass = 'dash-md-screen';
    }
    return styleClass;
  }

  toggleSide(): void {
    this.toggleSideMenu = !this.toggleSideMenu;
    this.sharedService?.showSideMenu?.next(this.toggleSideMenu);
  }
}

