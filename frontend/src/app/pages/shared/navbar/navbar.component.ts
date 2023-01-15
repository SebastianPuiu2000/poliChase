import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { WebsocketConnection } from "../../../shared/websocket-connection";
import { HttpRequests } from "../../../shared/http-requests";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    score: number;

    constructor(private router: Router) {
        this.getUserScore()
        setInterval(this.getUserScore, 5000);
    }

    onSignOutClick(): void {
        this.router.navigateByUrl('/login');
        WebsocketConnection.disconnect();
    }

    onColorChange(newColor: string): void {
        WebsocketConnection.sendColor(newColor);
    }

    private async getUserScore(): Promise<void> {
        const userInfo = await HttpRequests.getUserInfo();
        if (userInfo.success) {
            this.score = userInfo.user.score;
        }
    }
}
