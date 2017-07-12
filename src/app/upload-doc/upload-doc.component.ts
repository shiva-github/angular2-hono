import { Component, OnInit } from '@angular/core';
import  *  as  $ from 'jquery';
// import { FileDropDirective } from 'angular2-file-drop';

@Component({
	selector: 'app-upload-doc',
	templateUrl: './upload-doc.component.html',
	styleUrls: ['./upload-doc.component.css']
})
export class UploadDocComponent implements OnInit {
	// uploadObj: uploadDocData;
	selectedFile	: any;
	hidethis		: boolean;
	settingClass	: boolean;
	sdescription	: string;
	upload_file_name: string;
	description		: string;
	constructor() { 
		this.hidethis = false;
		this.upload_file_name = "No File Selected.";
		this.sdescription ="abc short name";
		this.description ="abc description";
		this.settingClass = false;
	}

	ngOnInit() {
	}
	allowDrop(event) {
		event.preventDefault();
		this.settingClass = true;
	}
	onFileChange(event){

		var files = event.srcElement.files;

		this.hidethis = true;
		if(files.length == 0){
			this.upload_file_name = "Selected File: "+this.selectedFile.name;
		}else{
			this.selectedFile = files[0];
			this.upload_file_name = "Selected File: "+files[0].name;
		}
		
	}
	drop(e){
		e.preventDefault();
		this.hidethis = true;
		var filedata = e.dataTransfer.files[0];
		let fileName = filedata.name;
		this.selectedFile = filedata;
		this.upload_file_name = "Selected File: " + fileName;
		// this.uploadObj.inputFile = filedata;
	}
	dragLeave(event){
		event.preventDefault();
		this.settingClass = false;
	}
	submitClick(){
		console.log(this.sdescription);
		console.log(this.selectedFile);
		console.log(this.description);
	}
}
export class uploadDocData {
	inputFile: any;
	name: string;
	description: string;
}
// Certified ServiceNow Administrator, Certified Implementation Specialists, ITIL Certified Team Members 