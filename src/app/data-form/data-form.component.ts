import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ConfigFunctions } from '../config';


import { DataFormService } from './data-form.service';
import { UploadDocComponent } from '../upload-doc/upload-doc.component';

@Component({
	selector: 'app-data-form',
	templateUrl: './data-form.component.html',
	styleUrls: ['./data-form.component.css'],
	providers: [DataFormService]
})
export class DataFormComponent implements OnInit {
	
	lname: string;
	lurl: string;
	ltype: string;
	diaryTitle: string;
	diaryDescription: string;
	description: string;
	constructor(private formSubmitService: DataFormService,private router: Router) {
		if(!ConfigFunctions.checkCookie("user")){
			this.router.navigate(['login']);	
		}		
	}
	ngOnInit() {
	}
	submitData(){
		var submitData = {
			"name": this.lname,
			"link" : this.lurl,
			"description" : this.description,
			"type": this.ltype,
			"tagname" : "form-data"
		}
		this.formSubmitService.insertData(submitData).subscribe(data=>{
			this.lname = "";
			this.lurl = "";
			this.description = "";
		});
	}
	submitDiaryData(){
		var submitData = {
			"title": this.diaryTitle,
			"description" : this.diaryDescription,
			"tagname" : "diaryInsert"
		}

		this.formSubmitService.insertData(submitData).subscribe(data=>{
			this.diaryTitle = "";
			this.diaryDescription = "";
		});
	}
}
export class FormData{
	name: string;
	url : string;
	type: string;
	description: string;
}