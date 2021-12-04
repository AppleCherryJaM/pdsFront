import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {MainService} from "../services/main.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, MainService]
})
export class LoginComponent implements OnInit {

  login: string = "";
  password: string = "";

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  sendLoginForm(login: string, password: string):string {
    console.log(`In login-form: ${login}: ${password}`);
    return this.auth.passwordComparator(login, password);
  }

  goToSignUpForm() {
    this.router.navigate(['/sign-up']);
  }
}
