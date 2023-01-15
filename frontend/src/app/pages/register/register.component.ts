import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BaseResponse } from "../../shared/responses/base-response.model";
import { BACKEND_URL } from "../../shared/constants";

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('usernameInput', {static: false}) usernameInputRef: ElementRef;
  @ViewChild('emailInput', {static: false}) emailInputRef: ElementRef;
  @ViewChild('passwordInput', {static: false}) passwordInputRef: ElementRef;

  registerSuccess = true;
  registerErrorMessage: string;

  constructor(private router: Router, private http: HttpClient) {
  }

  onSignUpClick(): void {
    const data = {
      name: this.usernameInputRef.nativeElement.value,
      email: this.emailInputRef.nativeElement.value,
      password: this.passwordInputRef.nativeElement.value
    };

    if (!this.validateFields(data)) {
      return;
    }

    this.http.post<BaseResponse>(BACKEND_URL + '/register', data)
        .subscribe(response => this.handleRegister(response));
  }

  private validateFields(data: any): boolean {
    if (data.name.length < 5 || data.email.length < 5 || data.password.length < 5) {
      this.registerSuccess = false;
      this.registerErrorMessage = "All fields must have minimum 5 characters!";
      return false;
    }
    return true;
  }

  private handleRegister(response: BaseResponse): void {
    console.log(response);
    if (!response.success) {
      this.registerSuccess = false;
      this.registerErrorMessage = 'Username already taken!';
      return;
    }

    this.router.navigateByUrl('/login');
    this.registerSuccess = true;
  }
}
