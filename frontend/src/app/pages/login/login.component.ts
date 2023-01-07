import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../../shared/responses/login-response.model";
import { BACKEND_URL } from "../../shared/constants";
import { WebsocketConnection } from "../../shared/websocket-connection";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('usernameInput', {static: false}) usernameInputRef: ElementRef;
  @ViewChild('passwordInput', {static: false}) passwordInputRef: ElementRef;

  loginSuccess = true;

  constructor(private router: Router, private http: HttpClient) {
  }

  onSignInClick(): void {
    const data = {
      name: this.usernameInputRef.nativeElement.value,
      password: this.passwordInputRef.nativeElement.value
    };

    this.http.post<LoginResponse>(BACKEND_URL + '/login', data)
        .subscribe(response => this.handleLogin(response));
  }

  private handleLogin(response: LoginResponse): void {
    if (!response.success) {
      this.loginSuccess = false;
      return;
    }

    WebsocketConnection.initialize(response.token);

    this.router.navigateByUrl('/map');
    this.loginSuccess = true;
  }

}
