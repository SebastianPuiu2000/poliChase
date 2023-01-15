import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { WebsocketConnection } from "../../shared/websocket-connection";
import { HttpRequests } from "../../shared/http-requests";

@Component({
  selector: 'app-login',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  name: string;
  email: string;
  color: string;
  score: number;

  constructor(private router: Router) {
    this.getPlayerInfo();
  }

  onSignOutClick(): void {
    this.router.navigateByUrl('/login');
    WebsocketConnection.disconnect();
  }

  private async getPlayerInfo(): Promise<void> {
    const userResponse = await HttpRequests.getUserInfo();

    this.name = userResponse.user.name;
    this.email = userResponse.user.email;
    this.color = userResponse.user.color;
    this.score = userResponse.user.score;
  }
}
