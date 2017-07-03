import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DataFormComponent } from './data-form/data-form.component';
import { FooterComponent } from './footer/footer.component';
import { LinksTableComponent } from './links-table/links-table.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
  AppComponent,
  HeaderComponent,
  DataFormComponent,
  FooterComponent,
  LinksTableComponent,
  LoginComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  RouterModule.forRoot([
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'formdata',
    component: DataFormComponent
  },
  {
    path: 'links',
    component: LinksTableComponent
  }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
