import { environment } from './../../../environments/environment';
import { keys } from './../../shared/configs/localstorage-key';
import { roots } from './../../shared/configs/endPoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = environment?.apiUrl;
  langKey: any = window?.localStorage?.getItem(keys?.language);

  constructor(private http: HttpClient) { }

  editProfile(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.profile?.editProfile, data);
  }
  addEditEducation(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.profile?.addEditEducation, data);
  }
  deleteEducation(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.deleteEducation + '/' + id);
  }

  addEditCertification(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.profile?.addEditCertification, data);
  }
  deleteCertification(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.deleteCertification + '/' + id);
  }

  addEditExperience(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.profile?.addEditExperience, data);
  }
  deleteExperience(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.deleteExperience + '/' + id);
  }

  addEditLanguage(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.profile?.addEditLanguage, data);
  }
  deleteLanguage(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.deleteLanguage + '/' + id);
  }
}
