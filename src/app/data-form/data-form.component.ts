import { Component, OnInit } from '@angular/core';
import { DataFormService } from './data-form.service';

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
	description: string;
	constructor(private formSubmitService: DataFormService) {
		
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
}
export class FormData{
	name: string;
	url : string;
	type: string;
	description: string;
}