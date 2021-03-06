import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule, JsonpModule } from '@angular/http';

import { config, ConfigFunctions } from '../config';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class DataFormService {

	constructor(private _http: Http) {
		
	}
	insertData(formData: any): Observable<any>{
		var sendData = JSON.stringify(formData);
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
