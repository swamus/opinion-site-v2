import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ArticlePageComponent } from './components/article-page/article-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';

const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch: 'full'},
  {
    path:'', component: LayoutComponent,
    children: [
      {path: 'home', component: LandingPageComponent, data: {title: 'home'}},
      {path: 'article-page/:id', component: ArticlePageComponent, data: {title: 'article-page'}},
      {path: 'login', component: LoginPageComponent, data: {title: 'login-page'}},
      {path: 'register', component: RegistrationPageComponent, data: {title: 'registration-page'}}
    ]
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
