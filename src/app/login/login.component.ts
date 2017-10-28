import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ConfigFunctions, config } from '../config';
import { LoginService } from './login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [ LoginService ],
})
export class LoginComponent implements OnInit {
	login: Login = {
		username: 'admin',
		password: ''
	};

	username: string;
	password: string;
	showerror: boolean;
	constructor(private router: Router, private loginService: LoginService) {
		this.username = this.login.username;
		this.password = this.login.password;
		this.showerror = false;
	}

	ngOnInit() {
		ConfigFunctions.setCookie("user","", 0);
	}
	loginClick(){
		if ( this.username != "" && this.password != "" ){
			this.loginService.loginAuth( this.username, this.password ).subscribe( data => {
				// console.log(  );
				if( data['status'] == "failure" ) {
					this.showerror = true;
				} else {
					ConfigFunctions.setCookie("user", data["SHIVAtest"], 1);
					this.router.navigate(['diary']);
				}
				// console.log(data[]);
				// ConfigFunctions.setCookie("user","shiva22222", 1);
				// this.router.navigate(['diary']);
			});		
		}else{
			this.showerror = true;
		}
	}
}
export class Login{
	username: string;
	password: string;
};