import { roots } from './../../shared/configs/endPoints';
import { environment } from './../../../environments/environment';
import { keys } from './../../shared/configs/localstorage-key';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiUrl = environment?.apiUrl;
  langKey: any = window?.localStorage?.getItem(keys?.language);

  constructor(private http: HttpClient) { }


  getSearchResults(value: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.home?.globalBarSearch + '/' + this.langKey, value);
  }
  getJobOfferSearchResults(value: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.home?.globalBarSearch + '/' + this.langKey, value);
  }
  getHiring(page_nbr: any): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.home?.hiring_by_area + '/' + this.langKey + '/' + page_nbr);
  }
  getJobRecommended(page_nbr: any): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.home?.job_recommended_for_you + '/' + this.langKey + '/' + page_nbr);
  }
  getJobOffersDetails(id: any): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.home?.job_offers + '/' + id + '/' + this.langKey);
  }
}
