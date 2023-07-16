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
    return this.http?.put<any>(this.apiUrl + roots?.profile?.editProfile, data);
  }
  addEditEducation(data: any, id?: any): Observable<any> {
    if (id) {
      return this.http?.put<any>(this.apiUrl + roots?.profile?.addEditEducation + '/' + id, data);
    } else {
      return this.http?.post<any>(this.apiUrl + roots?.profile?.addEditEducation, data);
    }
  }
  deleteEducation(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.deleteEducation + '/' + id);
  }

  addEditCertification(data: any, id?: any): Observable<any> {
    if (id) {
      return this.http?.put<any>(this.apiUrl + roots?.profile?.editCertification + '/' + id, data);
    } else {
      return this.http?.post<any>(this.apiUrl + roots?.profile?.addCertification, data);
    }
  }
  deleteCertification(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.deleteCertification + '/' + id);
  }

  addEditExperience(data: any, id?: any): Observable<any> {
    if (id) {
      return this.http?.put<any>(this.apiUrl + roots?.profile?.addEditExperience + '/' + id, data);
    } else {
      return this.http?.post<any>(this.apiUrl + roots?.profile?.addEditExperience, data);
    }
  }
  deleteExperience(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.deleteExperience + '/' + id);
  }

  addEditLanguage(data: any, id?: any): Observable<any> {
    if (id) {
      return this.http?.put<any>(this.apiUrl + roots?.profile?.editLanguage + '/' + id + roots?.profile?.byCandidate, data);

    } else {
      return this.http?.post<any>(this.apiUrl + roots?.profile?.addLanguage, data);
    }
  }
  deleteLanguage(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.deleteLanguage + '/' + id);
  }

  getSkills(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.getSkills + '/' + this.langKey);
  }
  getLanguages(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.getLanguages + '/' + this.langKey);
  }

  getDegreeName(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.degreeNameEducation + '/' + this.langKey);
  }
}
