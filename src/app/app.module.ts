import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DataFormComponent } from './data-form/data-form.component';
import { FooterComponent } from './footer/footer.component';
import { LinksTableComponent } from './links-table/links-table.component';
import { LoginComponent } from './login/login.component';
import { UploadDocComponent } from './upload-doc/upload-doc.component';
import { DiaryComponent } from './diary/diary.component';
import { TaskManageComponent } from './task-manage/task-manage.component';


// import { AuthService } from './authorization.service';

@NgModule({
  declarations: [
  AppComponent,
  HeaderComponent,
  DataFormComponent,
  FooterComponent,
  LinksTableComponent,
  LoginComponent,
  UploadDocComponent,
  DiaryComponent,
  TaskManageComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot([
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'formdata',
    component: DataFormComponent
  },
  {
    path: 'links',
    component: LinksTableComponent
  },
  {
    path: 'diary',
    component: DiaryComponent
  },
  { 
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
