import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { WebsocketConnection } from "../../../shared/websocket-connection";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(private router: Router) {
    }

    onSignOutClick(): void {
        this.router.navigateByUrl('/login');
        WebsocketConnection.disconnect();
    }
}
