import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule, JsonpModule } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import { ConfigFunctions, config } from '../config';

@Injectable()
export class LoginService {

	constructor(private _http: Http) { }
  	loginAuth( username, password ): Observable<any> {
		var sendData = JSON.stringify({"tagname" : "loginAuth", "uname": username,"pass": password});
		var makeJson = "json="+sendData;
		//post data
		var header = new Headers();
		header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		return this._http.post(config.serviceLink,makeJson,{
			headers: header
		}).map(response => {
			var data = response.json();
			return data;
		});
	}
}
