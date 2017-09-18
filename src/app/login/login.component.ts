import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ConfigFunctions, config } from '../config';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	login: Login = {
		username: 'admin',
		password: ''
	};

	username: string;
	password: string;
	constructor(private router: Router) {
		this.username = this.login.username;
		this.password = this.login.password;
	}

	ngOnInit() {
	}
	loginClick(){
		let loginObj = {
			user: this.username,
			pass: this.password,
			tagname: "userLogin"
		}
		console.log(loginObj);
		if(this.username == "SHIVA" && this.password == "shirbhate"){
			ConfigFunctions.setCookie("user","shiva22222", 1);
			this.router.navigate(['diary']);	
		}else{
			console.log("Error in login");
		}
		
	}
}
export class Login{
	username: string;
	password: string;
};