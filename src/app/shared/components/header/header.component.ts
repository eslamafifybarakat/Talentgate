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
  enableSearch: boolean = false;
  enableLocation: boolean = false;
  userData: any;

  moduleType: string = '';
  @Input() collapsed: boolean = false;
  @Input() screenWidth: any = 0;
  @Output() searchHandler: EventEmitter<any> = new EventEmitter();
  isLogged: any = window.localStorage.getItem(keys?.logged);
  url: any;
  scrollDown: boolean = false;
  searchInputValue: any;

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
  @ViewChild('search') search: any;
  @ViewChild('locationSearch') locationSearch: any;

  constructor(
    private sharedService: SharedService,
    private publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(window.localStorage.getItem(keys?.userLoginData) || '{}');

    this.sharedService?.urlData?.subscribe((res: any) => {
      this.moduleType = res?.type;
      this.enableSearch = res?.enableHeaderSearch;
      this.enableLocation = res?.enableLocation;
      this.cdr.detectChanges();
    })

    // if (window?.innerWidth < 700) {
    //   this.toggleSideMenu = true;
    //   this.sharedService?.showSideMenu?.next(true);
    // }
  }

  searchHandlerEmit(event: any): void {
    this.publicService?.recallSearchResults?.next(
      {
        recall: true,
        searchValue: event
      }
    );
    this.cdr?.detectChanges();
  }
  clearSearchValue(search?: any): void {
    search.value = '';
    this.searchHandler?.emit('');
  }
  clearSearch(): void {
    this.searchInputValue = null;
    this.publicService?.recallSearchResults?.next(
      {
        recall: true,
        searchValue: null
      }
    );
    this.cdr?.detectChanges();
  }

  locationSearchHandlerEmit(event: any): void {
    this.publicService?.recallLocationSearchResults?.next(
      {
        recall: true,
        searchValue: event
      }
    );
    this.cdr?.detectChanges();
  }
  clearLocationSearchValue(search: any): void {
    search.value = '';
    this.searchHandler?.emit('');
  }
}

