import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../../shared/responses/login-response.model";
import { BACKEND_URL } from "../../shared/constants";
import { WebsocketConnection } from "../../shared/websocket-connection";
import { HttpRequests } from "../../shared/http-requests";

@Component({
  selector: 'app-login',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @ViewChild('usernameInput', {static: false}) usernameInputRef: ElementRef;
  @ViewChild('passwordInput', {static: false}) passwordInputRef: ElementRef;

  loginSuccess = true;

  constructor(private router: Router, private http: HttpClient) {

  }

}
