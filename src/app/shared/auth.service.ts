import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Student} from "../user-class/student";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {error} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = "http://localhost:8090/student";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentStudent = {};

  constructor( private http: HttpClient, public router: Router) {

  }

  signUp(student: Student): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, student).pipe(
      catchError(this.handleError)
    )
  }

  signIn(student: Student) {
    return this.http.post<any>(`${this.endpoint}/signin`, student)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getStudentProfile(res.id).subscribe((res) => {
          this.currentStudent = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        })
    })
  }

  getToken() {
    return localStorage.getItem(`access_token`);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(`access_token`);
    return (authToken !== null);
  }

  getStudentProfile(id: number): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => { return res || {} }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      //client-side error
      msg = error.error.message;
    } else {
      //server-side error
      msg = `Error code: ${error.status} \nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
