import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { LinksTableService } from './links-table.service';
import { config, ConfigFunctions } from '../config';

@Component({
	selector: 'app-links-table',
	templateUrl: './links-table.component.html',
	styleUrls: ['./links-table.component.css'],
	providers: [LinksTableService]
})
export class LinksTableComponent implements OnInit {
	// for links 
	page: Page = {
		current: 1,
		size: 1
	};
	showPageNumbers :number[]; //for pagination
	linkdata :LinkData[];
	// linkstableservice: LinksTableService;
	totalCount: number;

	//common variables.
	switch: boolean;
	recPerPage:number = 5;

	// for documents
	Docpage: Page = {
		current: 1,
		size: 1
	};
	documentData: any;
	DocshowPageNumbers: number[];
	totalDocCount: number;

	constructor(private linkstableservice: LinksTableService,private router: Router) { 
		if(!ConfigFunctions.checkCookie("user")){
			this.router.navigate(['login']);	
		}
		this.linkstableservice = linkstableservice;
		this.page.current = 1;
		this.totalCount = 11;
		this.totalDocCount = 1;
	}
	ngOnInit() {
		//show all links
		this.linkstableservice.getLinks(1).subscribe(data =>{
			this.linkdata = data;
		});
		
		// update count for the total count for links
		this.linkstableservice.getTotalCount().subscribe(data =>{
			this.totalCount = data[0]['count'];
			this.update_pagination(this.totalCount);
		});
		


		//show all Documents
		this.linkstableservice.getDocuments(1).subscribe(data =>{
			this.documentData = data;
		});

		// update count for the total count for links
		this.linkstableservice.getTotalCountDoc().subscribe(data =>{
			this.totalDocCount = data[0]['count'];
			this.update_paginationDocs(this.totalDocCount);
		});
		
	}
	//---------------------- pagination chnage ----------------------//
	updatePage(value){
		if(value != this.page.current){
			this.page.current = value;
			// service call for record of the page
			this.linkstableservice.getLinks(value).subscribe(data =>{
				this.linkdata = data;
			},
			err =>{
				console.log(err);
			});
		}
		// load current data
	}
	update_pagination(lengthOfData){
		var len = lengthOfData;
		this.page.size = (len/this.recPerPage);
		var ab = new Array();
		for(var i=0;i< this.page.size;i++){
			ab.push(i+1);
		}
		this.showPageNumbers = ab;
		this.page.size = ab.length;
	}

	// document pagination
	update_paginationDocs(lengthOfData){
		var len = lengthOfData;
		this.Docpage.size = (len/this.recPerPage);
		var ab = new Array();
		for(var i=0;i< this.Docpage.size;i++){
			ab.push(i+1);
		}
		this.DocshowPageNumbers = ab;
		this.Docpage.size = ab.length;
	}
	// update doc Pages
	DocupdatePage(value){
		if(value != this.Docpage.current){
			this.Docpage.current = value;
			// service call for record of the page
			this.linkstableservice.getDocuments(value).subscribe(data =>{
				this.documentData = data;
			},
			err =>{
				console.log(err);
			});
		}
		// load current data
	}
	//end doc pagination
	//---------------------- pagination chnage ----------------------//

	//---------------------- Switch Operation start ----------------------//
	switchView(){
		if(this.switch){
			
		}
		if(!this.switch){
			
		}
		
	}
	//---------------------- Switch Operation end ----------------------//
	//---------------------- page operations ----------------------//
	deleteLink(linkId){
		var key = this.getIndex(linkId);
		this.linkstableservice.deleteLink(linkId);
		this.linkstableservice.getLinks(this.page.current).subscribe(data =>{
			this.linkdata = data;
		});

		this.linkstableservice.getTotalCount().subscribe(data =>{
			this.totalCount = data[0]['count'];
			this.update_pagination(this.totalCount);
		});
	}
	edit(editId){
		var linkIndex = this.getIndex(editId);
		if(this.linkdata[linkIndex].edit){
			this.linkdata[linkIndex].edit = false;
		}
		else{
			this.linkdata[linkIndex].edit = true;
		}
	}
	downvote(id){
		var index = this.getIndex(id);
		this.linkdata[index].vote = this.linkdata[index].vote-1;
		this.linkstableservice.updatevote(this.linkdata[index].vote,parseInt(id)).subscribe();
	}
	upvote(id){
		var index = this.getIndex(id);
		this.linkdata[index].vote =  this.linkdata[index].vote+1;
		this.linkstableservice.updatevote(this.linkdata[index].vote,parseInt(id)).subscribe();

	}
	//---------------------- page operations ----------------------//

	//---------------------- Sorting ----------------------//
	sortByvote(value){
		var byDate = this.linkdata.slice(0);
		if(value){
			byDate.sort(function(a,b) {
				return a.vote - b.vote;
			});
		}else{
			byDate.sort(function(a,b) {
				return b.vote - a.vote;
			});
		}
		this.linkdata = byDate;
	}
	sortById(value){
		var byDate = this.linkdata.slice(0);
		if(value){
			byDate.sort(function(a,b) {
				return a.id - b.id;
			});
		}else{
			byDate.sort(function(a,b) {
				return b.id - a.id;
			});
		}
		this.linkdata = byDate;
	}
	sortByDate(value){
		var byDate = this.linkdata.slice(0);
		if(value){
			byDate.sort(function(a,b) {
				return  new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
			});
		}else{
			byDate.sort(function(a,b) {
				return  new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
			});
		}
		this.linkdata = byDate;
	}
	//---------------------- Sorting end ----------------------//
	//---------------------- Other Function ----------------------//
	getIndex(id){
		for (var i = this.linkdata.length - 1; i >= 0; i--) {
			if(this.linkdata[i].id == id ){
				return i;
			}
		}
	}
	//---------------------- Other Function ----------------------//




	//---------------------- functions for document start ----------------------//
	getIndexDoc(id){
		for (var i = this.documentData.length - 1; i >= 0; i--) {
			if(this.documentData[i].id == id ){
				return i;
			}
		}
	}
	editDoc(editId){
		var linkIndex = this.getIndexDoc(editId);
		if(this.documentData[linkIndex].edit){
			this.documentData[linkIndex].edit = false;
		}
		else{
			this.documentData[linkIndex].edit = true;
		}
	}
	downvoteDoc(id){
		var index = this.getIndexDoc(id);
		this.documentData[index].vote = this.documentData[index].vote-1;
	}
	upvoteDoc(id){
		var index = this.getIndexDoc(id);
		this.documentData[index].vote =  this.documentData[index].vote+1;
	}
	//---------------------- functions for document end ----------------------//
	





}
export class LinkData  {
	id: number;
	name: string;
	description: string;
	vote: number;
	link: string;
	datetime: string;
	edit: boolean = false;
}
export class Page  {
	current: number;
	size: number;
}