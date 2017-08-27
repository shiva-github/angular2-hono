import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { DataFormComponent } from '../data-form/data-form.component';
import { LinksTableComponent } from '../links-table/links-table.component';
import { LoginComponent } from './login.component';

@NgModule({
	imports: [
	CommonModule
	],
	declarations: [DataFormComponent, LinksTableComponent, LoginModule]
})
export class LoginModule { }
