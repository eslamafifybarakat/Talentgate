import { roots } from './../../shared/configs/endPoints';
import { environment } from './../../../environments/environment';
import { keys } from './../../shared/configs/localstorage-key';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { saveAs } from '@progress/kendo-drawing/dist/npm/pdf';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiUrl = environment?.apiUrl;
  langKey: any = window?.localStorage?.getItem(keys?.language);

  constructor(private http: HttpClient) { }


  getSearchResults(value: any): Observable<any> {
    let data: any = {};
    if (value != null) {
      data['value'] = value;
    }
    return this.http?.post<any>(this.apiUrl + roots?.home?.globalBarSearch + '/' + this.langKey, data);
  }
  getJobOfferSearchResults(id?: any, value?: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.home?.job_offers_search + '/' + this.langKey + '/' + id, value);
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

  applyForJob(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.home?.apply_for_job, data);
  }

  getProfileDetails(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.home?.profile + '/' + this.langKey);
  }

  addResume(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.home?.resume, data);
  }
  editResume(data: any, id: number) {
    return this.http?.put<any>(this.apiUrl + roots?.home?.resume + '/' + id, data);
  }
  getResume(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.home?.getResume);
  }
  getInterviews(date: any, page_nbr: any): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.home?.interview + '/' + date + '/' + page_nbr + '/' + this.langKey);
  }
  getInterviewDetails(id: number) {
    return this.http?.get<any>(this.apiUrl + roots?.home?.detailsInterView + '/' + id + '/' + this.langKey)
  }
  getNotification(page_nbr: any) {
    return this.http?.get<any>(this.apiUrl + roots?.home?.notification + '/' + this.langKey + '/' + page_nbr);
  }
  getSchedularEvents(date: any): Observable<any> {
    let params = new HttpParams();
    params = params.append("date", date);
    return this.http?.get<any>(this.apiUrl + roots?.scheduler?.events, { params: params });
  }
  downloadPDF(url: any): any {
    // this.http?.get(url, { responseType: 'blob' }).subscribe((response: any) => {
    //   saveAs(response, 'cv.pdf');
    // });
  }
  applyJob(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.home?.applyJob, data);
  }

  getListQuestionByJobOffer(id: any): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.home?.getListQuestionByJobOffer + '/' + id + '/' + this.langKey);
  }
}
