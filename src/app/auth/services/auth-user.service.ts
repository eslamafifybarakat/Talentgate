import { environment } from './../../../environments/environment';
import { roots } from './../../shared/configs/endPoints';
import { Router } from '@angular/router';
import { keys } from './../../shared/configs/localstorage-key';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare const IN: any;
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  apiUrl = environment?.apiUrl;
  langkey: any = window.localStorage.getItem(keys.language);

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.auth?.login + '/' + this.langkey, data);
  }

  signup(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.auth?.signup + '/' + this.langkey, data);
  }

  uploadcv(files: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.auth?.uploadcv, files);
  }

  getCountries(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.auth?.countries + '/' + this.langkey);
  }

  getUserData(): Observable<any> {
    return this.http?.get<any>(this.apiUrl + roots?.auth?.getUserData);
  }
  forgetPassword(data: any): Observable<any> {
    return this.http?.post<any>(this.apiUrl + roots?.auth?.forgetPassword, data);
  }
  isLoggedIn(): boolean {
    return window?.localStorage?.getItem(keys?.userLoginData) ? true : false;
  }
  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  uploadImage(data: any): Observable<any> {
    // const formData = new FormData();
    // formData.append('image', file);
    // return this.http.post<any>('api/upload', formData).toPromise();
    return this.http?.post<any>(this.apiUrl + roots?.auth?.upLoadImage, data);
  }
  signOut(): any {
    window?.localStorage?.removeItem(keys?.logged);
    window?.localStorage?.removeItem(keys?.userLoginData);
    window?.localStorage?.removeItem(keys?.userData);
    window?.localStorage?.removeItem(keys?.token);
    this.router?.navigate(['/auth']);
  }

  loginWithLinkedIn(): void {
    IN.User.authorize(() => {
      IN.API.Profile("me")
        .fields("id,firstName,lastName,emailAddress")
        .result((res: any) => {
          const user = res.values[0];
          console.log(user);
        })
        .error((error: any) => {
          console.log(error);
          // Handle error
        });
    });
  }
}
