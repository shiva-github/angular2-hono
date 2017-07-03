import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-data-form',
	templateUrl: './data-form.component.html',
	styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
	formdata: FormData = {
		name: 'link name',
		url : 'http://url.com/abc',
		type: 'Add to links table.',
		description: 'abc'
	}
	lname: string;
	lurl: string;
	ltype: string;
	description: string;
	constructor() {
		this.lname = this.formdata.name;
		this.lurl = this.formdata.url;
		this.ltype = this.formdata.type;
		this.description = this.formdata.description;
	}

	ngOnInit() {
	}

}
export class FormData{
	name: string;
	url : string;
	type: string;
	description: string;
}