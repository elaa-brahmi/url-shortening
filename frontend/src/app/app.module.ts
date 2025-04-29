import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LinksComponent } from './pages/links/links.component';
import { CustomLinksComponent } from './pages/custom-links/custom-links.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LinksComponent,
    CustomLinksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
