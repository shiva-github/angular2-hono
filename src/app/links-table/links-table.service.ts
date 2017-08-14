import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule, JsonpModule } from '@angular/http';

import { LinkData } from './links-table.component';
import { config, ConfigFunctions } from '../config';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class LinksTableService {

	constructor(private _http: Http) {
		
	}
	getLinks(pageNumber): Observable<LinkData[]>{
		var sendData = JSON.stringify({"tagname" : "showlinks", "pageNumber": pageNumber});
		var makeJson = "json="+sendData;
		//post data
		var header = new Headers();
		header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		header.append("Content-Type", "multipart/form-data; charset=UTF-8");
		return this._http.post(config.serviceLink,makeJson,{
			headers: header
		}).map(response => {
			var data = JSON.parse(response.json());
			for (var i = data.length - 1; i >= 0; i--) {
				data[i]["edit"] = false;
				data[i]['datetime'] = ConfigFunctions.convertDate(data[i]['time']);
				data[i]["vote"] = parseInt(data[i]["vote"]);
				delete data[i]['time'];
			}
			return data;
		});
	}

	// test Service

	// test service end

	getTotalCount(): Observable<any>{
		// linksCount
		var sendData = JSON.stringify({"tagname" : "linksCount"});
		var makeJson = "json="+sendData;
		//post data
		var header = new Headers();
		header.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		// header.append("Content-Type", "multipart/form-data; charset=UTF-8");
		return this._http.post(config.serviceLink,makeJson,{
			headers: header
		}).map(response => {
			var data = response.json();
			return data;
		});
		// return 10;
	}
	deleteLink(recordNumber){
		console.log(recordNumber+"record deleted...");
	}
	updatevote(vote,id): Observable<any>{
		var sendData = JSON.stringify({"tagname" : "updatevote", "vote": vote,"voteid":id});
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