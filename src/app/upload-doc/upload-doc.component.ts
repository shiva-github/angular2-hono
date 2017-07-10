import { Component, OnInit } from '@angular/core';
// import { FileDropDirective } from 'angular2-file-drop';

@Component({
	selector: 'app-upload-doc',
	templateUrl: './upload-doc.component.html',
	styleUrls: ['./upload-doc.component.css']
})
export class UploadDocComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}
	allowDrop(event) {
		event.preventDefault();
		return true;
	}
	drop(e){
		console.log(e);
		e.preventDefault();
	}
}
export class uploadDocData {
	

}
// Certified ServiceNow Administrator, Certified Implementation Specialists, ITIL Certified Team Members 