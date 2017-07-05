import { Component, OnInit } from '@angular/core';
import { LinksTableService } from './links-table.service';

@Component({
	selector: 'app-links-table',
	templateUrl: './links-table.component.html',
	styleUrls: ['./links-table.component.css'],
	providers: [LinksTableService]
})
export class LinksTableComponent implements OnInit {
	page: Page = {
		current: 1,
		size: 1
	};
	recPerPage:number = 5;
	showPageNumbers :number[]; //for pagination
	linkdata :LinkData[];
	linkstableservice: LinksTableService;
	totalCount: number;
	constructor(linkstableservice: LinksTableService) { 
		this.linkstableservice = linkstableservice;
		this.page.current = 1;
		this.totalCount = this.linkstableservice.getTotalCount();// this.loadData.length;
		this.linkdata = this.linkstableservice.getLinks(1);
		
		// this.linkdata = linkstableservice.getLinks();
		this.update_pagination(this.totalCount);
	}
	ngOnInit() {
	}
	//---------------------- pagination chnage ----------------------//
	updatePage(value){
		if(value != this.page.current){
			this.page.current = value;
			// service call for record of the page
			this.linkdata = this.linkstableservice.getLinks(value);
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
	//---------------------- pagination chnage ----------------------//
	
	//---------------------- page operations ----------------------//
	deleteLink(linkId){
		var key = this.getIndex(linkId);
		this.linkstableservice.deleteLink(linkId);
		this.linkdata = this.linkstableservice.getLinks(this.page.current);
		// var index = this.linkdata.indexOf(this.linkdata[key], 0);
		// if (index > -1) {
		// 	this.linkdata.splice(index, 1);
		// }
		this.totalCount = this.linkstableservice.getTotalCount();
		this.update_pagination(this.totalCount);
	}
	edit(editId){
		var linkIndex = this.getIndex(editId);
		if(this.linkdata[linkIndex].edit){
			this.linkdata[linkIndex].edit = false;
			console.log();
		}
		else{
			this.linkdata[linkIndex].edit = true;
		}
	}
	downvote(id){
		var index = this.getIndex(id);
		this.linkdata[index].upvote = this.linkdata[index].upvote-1;
	}
	upvote(id){
		var index = this.getIndex(id);
		this.linkdata[index].upvote = this.linkdata[index].upvote+1;

	}
	//---------------------- page operations ----------------------//
	
	//---------------------- Sorting ----------------------//
	sortByupVote(value){
		var byDate = this.linkdata.slice(0);
		if(value){
			byDate.sort(function(a,b) {
				return a.upvote - b.upvote;
			});
		}else{
			byDate.sort(function(a,b) {
				return b.upvote - a.upvote;
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
}
export class LinkData  {
	id: number;
	name: string;
	description: string;
	upvote: number;
	link: string;
	datetime: string;
	edit: boolean = false;
}
export class Page  {
	current: number;
	size: number;
}
