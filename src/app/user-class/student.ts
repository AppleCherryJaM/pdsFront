export class Student {
 id: number = 0;
 surname: string = "";
 name: string = "";
 age: number = 0;
 email: string = "";
 password: string = "";

 constructor(surname: string, name: string, age: number, email: string, password: string) {
   this.surname = surname;
   this.name = name;
   this.age = age;
   this.email = email;
   this.password = password;
 }

 public get getSurname(): string {
   return this.surname;
 }
 public get getName(): string {
   return this.name;
 }
 public get getAge(): number {
   return this.age;
 }
 public get getEmail(): string {
   return this.email;
 }
 public get getPassword(): string {
   return this.password;
 }
}
