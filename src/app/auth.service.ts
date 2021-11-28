import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = "http://localhost:8090/students"

  constructor() { }
}
