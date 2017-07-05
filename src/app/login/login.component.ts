import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	login: Login = {
		username: 'username',
		password: 'password'
	};

	username: string;
	password: string;
	constructor(router: RouterModule) {
		this.username = this.login.username;
		this.password = this.login.password;
	}

	ngOnInit() {
	}

}
export class Login{
	username: string;
	password: string;
};