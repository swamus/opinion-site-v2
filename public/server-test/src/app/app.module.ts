import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ArticlePageComponent } from './components/article-page/article-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
//needs to be "http client module" instead of httpClient for some reason
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LayoutComponent,
    LandingPageComponent,
    ArticlePageComponent,
    RegistrationPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    PostsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
