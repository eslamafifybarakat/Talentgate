import { PublicService } from './../../services/public.service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { keys } from 'src/app/shared/configs/localstorage-key';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { SharedModule} from '../../shared.module'
import { ProfileService } from 'src/app/pages/services/profile.service';
import { HomeService } from 'src/app/pages/services/home.service';
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
  text: string[]=[];
  results: string[]=[];
  searchResults:any = [];
  imgSrc: string = 'https://dev-api.talentsgates.website/getimage/';
  moduleType: string = '';
  @Input() collapsed: boolean = false;
  @Input() screenWidth: any = 0;
  @Output() searchHandler: EventEmitter<any> = new EventEmitter();
  isLogged: any = window.localStorage.getItem(keys?.logged);
  url: any;
  isDropdownOpen = false;
  scrollDown: boolean = false;
  searchInputValue: any;

  // @HostListener("window:scroll", ["$event"])
  // handleKeyDown() {
  //   let element = document.querySelector(".navbar") as HTMLElement;
  //   if (window.pageYOffset > 20) {
  //     element.classList.add("headerScroll");
  //     this.scrollDown = true;

  //   } else {
  //     element.classList.remove("headerScroll");
  //     this.scrollDown = false;
  //   }
  // }
  @ViewChild('search') search: any;
  @ViewChild('locationSearch') locationSearch: any;
  @ViewChild('searchResultsList') searchResultsList!: ElementRef;
  constructor(
    private sharedService: SharedService,
    private publicService: PublicService,
    private HomeService:HomeService,
    private cdr: ChangeDetectorRef,
    private router: Router, private profileService: ProfileService,private eRef: ElementRef,
    private ProfileService:ProfileService
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
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement &&this.searchResultsList?.nativeElement !=targetElement ) {
      this.searchResults = [];
    }
  }

  onSearchChange(data:any)
  {
    this.isDropdownOpen = true;
    this.HomeService.getSearchResults(data).subscribe(res => {
      console.log(res)
      // this.hideResults = false;
      this.searchResults =res.data.search_result;
      console.log(this.searchResults)
    });
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
    this.isDropdownOpen = false;
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
    this.searchInputValue = null;
    this.publicService?.recallLocationSearchResults?.next(
      {
        recall: true,
        searchValue: null
      }
    );
    this.cdr?.detectChanges();
  }
  chooseItem(item:any)
  {
    console.log(item);
    if (item.result_type == 1)
    {
      this.ProfileService.viewprofileDetails(item._id).subscribe((res)=>{
        console.log(res);
        this.router.navigateByUrl(`/profile/${item._id}`);
      })
    }else if(item.result_type == 0)
    {
      this.profileService.viewCompanyDetails(item._id).subscribe((res)=>{
        console.log(res)
      })
    }
  }
}

