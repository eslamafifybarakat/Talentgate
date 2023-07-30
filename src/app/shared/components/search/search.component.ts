import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  text: string='';

  results: string[]=[];
  constructor() { }

  ngOnInit(): void {
  }
  search(event:any)
  {
    
  }
}
