import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./pages/shared/navbar/navbar.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { MapComponent } from "./pages/map/map.component";
import { ProfileComponent } from "./pages/profile/profile.component";

@NgModule({
  declarations: [
      AppComponent,
      NavbarComponent,
      RegisterComponent,
      LoginComponent,
      ProfileComponent,
      MapComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
