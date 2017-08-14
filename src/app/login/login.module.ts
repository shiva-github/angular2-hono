import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';


import { DataFormComponent } from '../data-form/data-form.component';
import { LinksTableComponent } from '../links-table/links-table.component';
import { LoginComponent } from './login.component';

@NgModule({
	imports: [
	CommonModule,
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
		}
		])
	],
	declarations: [DataFormComponent, LinksTableComponent, LoginModule]
})
export class LoginModule { }
