import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../user-class/student";
import {Teacher} from "../user-class/teacher";
import { map } from "rxjs/operators";
import {Lesson} from "../user-class/lesson";
import {Time} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly endpoint: string;
  constructor(private http: HttpClient) {
    this.endpoint = "http://localhost:8090/pds";
  }

  //students
  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.endpoint}/students`);
  }
  public getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.endpoint}/students/${id}`);
  }
  public getStudentByEmail(email: string): Student | null {
    //return this.http.get<Student>(`${this.endpoint}/students/get/email`)
    let student: Student;
    console.log(this.getAllStudents().pipe(map((students: Student[]) => students.find(student => student.email == email))));
    /*this.students = this.getAllStudents()
      .pipe(map((data: Student[]) => {
        return data.map(function (user: Student): Student {
          return new Student(user.name,
            user.surname, user.age, user.email, user.password);
        });
      }));*/
    student = <Student><unknown>this.getAllStudents().pipe(map((students: Student[]) => students.find(student => student.email == email)));
    return student;
  }

  //teachers
  public getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.endpoint}/teachers`);
  }
  public getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.endpoint}/teachers/get/${id}`);
  }
  public getTeacherByEmail(email: String): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.endpoint}/teachers/get/email`)
  }

  //lessons
  public getTimetable(teacherId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.endpoint}/${teacherId}/lessons`);
  }
  public editLesson(teacherId: number, lessonId: number, time: Time) {
    this.http.post(`${this.endpoint}/${teacherId}/lessons/${lessonId}`, time);
  }
}
