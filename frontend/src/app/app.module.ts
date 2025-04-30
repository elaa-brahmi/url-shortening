import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LinksComponent } from './pages/links/links.component';
import { CustomLinksComponent } from './pages/custom-links/custom-links.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

const appRoutes: Routes = [
  // Define your routes here, for example:
  // { path: '', component: MainPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LinksComponent,
    CustomLinksComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,

  ],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    MatSidenavModule,
    RouterModule.forRoot(appRoutes), //This sets up the router with your defined routes and provides routing services (like Router, ActivatedRoute, etc.) to your whole app.
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
