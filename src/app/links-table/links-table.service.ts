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
	//---------------------- services for links start ----------------------//
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
	// service for test app
	
	getLinks1(pageNumber): LinkData[]{
		if(pageNumber == 1){
			var response = "[{\"id\":\"1\",\"name\":\"First Doc\",\"link\":\"abc.com\",\"description\":\"Test data\",\"vote\":\"0\",\"time\":\"2017-08-15 21:19:47\"},{\"id\":\"2\",\"name\":\"Shiva Shirbhate\",\"link\":\"shiva.com\",\"description\":\"Test data 2\",\"vote\":\"0\",\"time\":\"2017-08-15 21:19:47\"},{\"id\":\"3\",\"name\":\"link name\",\"link\":\"http:\\\/\\\/url.com\\\/abc\",\"description\":\"abc\",\"vote\":\"0\",\"time\":\"2017-08-15 21:19:47\"},{\"id\":\"4\",\"name\":\"test 2\",\"link\":\"http:\\\/\\\/test2.com\\\/abc\",\"description\":\"testing works\",\"vote\":\"0\",\"time\":\"2017-08-15 21:19:47\"},{\"id\":\"5\",\"name\":\"link name\",\"link\":\"http:\\\/\\\/url.com\\\/abc\",\"description\":\"abc\",\"vote\":\"0\",\"time\":\"2017-08-15 21:19:47\"}]";
			var data = JSON.parse(response);
			for (var i = data.length - 1; i >= 0; i--) {
				data[i]["edit"] = false;
				data[i]['datetime'] = ConfigFunctions.convertDate(data[i]['time']);
				data[i]["vote"] = parseInt(data[i]["vote"]);
				delete data[i]['time'];
			}
			return data;
		}
		if(pageNumber == 2){
			var response = "[{\"id\":\"6\",\"name\":\"second LInks\",\"link\":\"http:\\\/\\\/url.com\\\/abc\",\"description\":\"abc\",\"vote\":\"0\",\"time\":\"2017-08-14 08:10:51\"},{\"id\":\"7\",\"name\":\"link name3\",\"link\":\"http:\\\/\\\/url.com\\\/abc3\",\"description\":\"abc3\",\"vote\":\"0\",\"time\":\"2017-08-14 08:11:13\"},{\"id\":\"8\",\"name\":\"link name5\",\"link\":\"http:\\\/\\\/url.com\\\/abc5\",\"description\":\"abc5\",\"vote\":\"0\",\"time\":\"2017-08-14 08:12:33\"}]";
			var data = JSON.parse(response);
			for (var i = data.length - 1; i >= 0; i--) {
				data[i]["edit"] = false;
				data[i]['datetime'] = ConfigFunctions.convertDate(data[i]['time']);
				data[i]["vote"] = parseInt(data[i]["vote"]);
				delete data[i]['time'];
			}
			return data;
		}
	}
	// service for test app end 



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
	//---------------------- services for links start ----------------------//


	//---------------------- services for document start ----------------------//
	getDocuments(pageNumber): Observable<LinkData[]>{
		var sendData = JSON.stringify({"tagname" : "showdocuments", "pageNumber": pageNumber});
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


	getTotalCountDoc(): Observable<any>{
		// linksCount
		var sendData = JSON.stringify({"tagname" : "docsCount"});
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
	}
	deleteDoc(recordNumber){
		console.log(recordNumber+"record deleted...");
	}
	updatevoteDoc(vote,id): Observable<any>{
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
	//---------------------- services for document start ----------------------//
}