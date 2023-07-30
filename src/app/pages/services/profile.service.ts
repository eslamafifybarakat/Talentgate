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
  deleteSkills(id: any): Observable<any> {
    return this.http?.delete<any>(this.apiUrl + roots?.profile?.getSkills + '/' + id);
  }
  addEditSkill(data: any, id?: any): Observable<any> {
    if (id) {
      return this.http?.put<any>(this.apiUrl + roots?.profile?.getSkills + '/' + id, data);

    } else {
      return this.http?.post<any>(this.apiUrl + roots?.profile?.getSkills + '/' + roots?.profile?.byCandidate, data);
    }
  }
  getLanguages(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.getLanguages + '/' + this.langKey);
  }

  getDegreeName(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.degreeNameEducation + '/' + this.langKey);
  }

  updateCoverImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('cover_picture', file);

    return this.http.put<any>(this.apiUrl + '/candidates/update_cover_picture', formData);

  }
  updateProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.put<any>(this.apiUrl + '/candidates/update_image', formData);

  }
  getSkill(query: any): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.getSkills + '/' + this.langKey + '/' + query);
  }
  getDetailSkill(id: number) {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.detailsSkill + '/' + id + '/' + this.langKey);
  }
  getCompanies(query: any): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.getCompanies + '/' + this.langKey + '/' + query);
  }
  updateImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.put<any>(this.apiUrl + '/candidates/update_cover_picture', formData);
  }
  editResume(about_me: any): Observable<any> {
    let data: any = {};
    if (about_me) {
      data['about_me'] = about_me;
    }
    return this.http.put<any>(this.apiUrl + roots?.profile?.editResume, data);
  }
  getResume(): Observable<any> {
    return this.http.get<any>(this.apiUrl + roots?.profile?.getResume);
  }
  addResume(about_me: any): Observable<any> {
    let data: any;
    if (about_me) {
      data['about_me'] = about_me;
    }
    return this.http.post<any>(this.apiUrl + roots?.profile?.addResume, data);
  }

  viewProfileDetails(id: number) {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.view_candidate_profile + '/' + id + '/' + this.langKey);
  }

  viewCompanyDetails(id: number) {
    return this.http?.get<any>(this.apiUrl + roots?.profile?.view_company_profile + '/' + id + '/' + this.langKey);
  }
}
