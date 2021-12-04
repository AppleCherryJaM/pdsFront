import {Student} from "./student";
import {Lesson} from "./lesson";

export class Teacher {
  id: number = 0;
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
  students: Student[] = [];
  lessons: Lesson[] = [];
}
