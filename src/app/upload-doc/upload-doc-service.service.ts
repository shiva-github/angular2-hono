import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptionsArgs } from '@angular/http';
import { HttpModule } from '@angular/http';
import { config, ConfigFunctions } from '../config';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UploadDocServiceService {

	constructor(private _http: Http) {

	}

	uploadFileService(sendThisContent, fileContent){
		
		// testAB.append("testFile", fileContent, fileContent.name);
		var header = new Headers();
		let formData:FormData = new FormData();
		formData.append("file",fileContent, fileContent.name);
		let jsonData = '{"tagname": "upload-file", "name": "'+ 
		sendThisContent.name+'", "description": "'+ 
		sendThisContent.description+'"}';

		formData.append("json", jsonData);		
		
		return this._http.post(config.serviceLink,formData).subscribe(response => {
		 	console.log(response);
		 	// var data = response.json();
		 	// return data;
		 },
		 err =>{
		 	console.log(err);
		 });
	}
	getTotalCount(): Observable<any>{
		// linksCount
		var sendData = JSON.stringify({"tagname" : "linksCount"});
		var makeJson = "json="+sendData;
		//post data
		var header = new Headers();
		header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		header.append("Content-Type", "multipart/form-data; charset=UTF-8");
		return this._http.post(config.serviceLink,makeJson,{
			headers: header
		}).map(response => {
			var data = response.json();
			return data;
		});
	}


}
