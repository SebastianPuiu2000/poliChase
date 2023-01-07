import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) {
  }

  onSignUpClick(): void {
    this.router.navigateByUrl('/register');
  }

  onSignInClick(): void {
    // verificare daca e ok si daca da =>
    this.router.navigateByUrl('/map');

    // altfel => alerta/banner ca nu e buna combinatia
  }
}
