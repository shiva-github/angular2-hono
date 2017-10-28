import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule, JsonpModule } from '@angular/http';

import { mainDiaryData } from './diary.component';
import { config, ConfigFunctions } from '../config';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class DiaryService {

  	constructor(private _http: Http) {
		
	}
	// getDateContents(date): any{

	// 	let listArray = [{
	// 		"id": 1,
	// 		"title": "this is title 1"
	// 	},{
	// 		"id": 2,
	// 		"title": "this is title 2"
	// 	},{
	// 		"id": 3,
	// 		"title": "this is title 3"
	// 	}];
	// 	return listArray;
	// 	// var sendData = JSON.stringify({"tagname" : "sendDate", "dateforContent": date});
	// 	// var makeJson = "json="+sendData;
	// 	// //post data
	// 	// // return this._http.post(config.serviceLink,makeJson).map(response => {
	// 	// // 	var data = JSON.parse(response.json());
	// 	// // 	console.log("test",data);
	// 	// // 	return data;
	// 	// // });
	// 	// return null;
	// }


	getDateContents(date): Observable<any>{

		var sendData = JSON.stringify({"tagname" : "sendDiaryDate", "contentOnDate": date});
		var makeJson = "json="+sendData;
		//post data
		var header = new Headers();
		header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		return this._http.post(config.serviceLink,makeJson,{headers:header}).map(response => {
			var data = JSON.parse(response.json());
			return data;
		});

	}
	populateDiaryContentForId(id): Observable<any>{
		
		var sendData = JSON.stringify({"tagname" : "getDiaryById", "diaryId": id});
		var makeJson = "json="+sendData;
		//post data
		var header = new Headers();
		header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		return this._http.post(config.serviceLink,makeJson,{headers:header}).map(response => {
			var data = JSON.parse(response.json());
			return data;
		});
	}


}
