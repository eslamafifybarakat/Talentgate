import { PublicService } from './../../services/public.service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { keys } from 'src/app/shared/configs/localstorage-key';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleSideMenu: boolean = false;
  toggle: boolean = false;

  moduleType: string = '';
  @Input() collapsed: boolean = false;
  @Input() screenWidth: any = 0;
  @Output() searchHandler: EventEmitter<any> = new EventEmitter();
  isLogged: any = window.localStorage.getItem(keys?.logged);
  url: any;
  scrollDown: boolean = false;
  @HostListener("window:scroll", ["$event"])
  handleKeyDown() {
    let element = document.querySelector(".navbar") as HTMLElement;
    if (window.pageYOffset > 20) {
      element.classList.add("headerScroll");
      this.scrollDown = true;

    } else {
      element.classList.remove("headerScroll");
      this.scrollDown = false;
    }
  }
  searchValue: any;
  @ViewChild('search') search: any;

  constructor(
    private sharedService: SharedService,
    private publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.url = this.router?.url;
    console.log(this.url);

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
  searchHandlerEmit(event: any): void {
    this.publicService?.recallSearchResults?.next(
      {
        recall: true,
        searchValue: event
      }
    );
    this.cdr.detectChanges();
  }
  clearSearchValue(search: any): void {
    search.value = '';
    this.searchHandler.emit('');
  }
}

