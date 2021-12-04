import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../user-class/student";
import {Teacher} from "../user-class/teacher";
import {MainService} from "./main.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint: string;
  private student: Student = new Student('T', 't',0,'t','t');

  constructor(private http: HttpClient, private getService: MainService) {
    this.endpoint = "http://localhost:8090/pds";
  }

  //students
  public postStudent(student: Student): void {
    const body = {name: student.name,
      surname: student.surname,
      age: student.age,
      email: student.email,
      password: student.password,
    };
    this.http.post('http://localhost:8090/students', body);
  }

  public passwordComparator(email: string, password: string): string {
    //this.getService.getStudentByEmail(email)?.subscribe((data: Student) => this.student = data);
    console.log(`In auth-service: ${email}: ${password}: ${this.getService.getStudentByEmail(email)}`);
    if(this.getService.getStudentByEmail(email) !== null) {
      let getPassword = this.getService.getStudentByEmail(email)?.getPassword;
      return (getPassword == password ? "Cock" : "Ass");
    } else return "FUCKING CUMMING"
  }

  //teachers

}
