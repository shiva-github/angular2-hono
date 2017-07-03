import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-links-table',
	templateUrl: './links-table.component.html',
	styleUrls: ['./links-table.component.css']
})
export class LinksTableComponent implements OnInit {
	page: Page = {
		current: 1,
		size: 1
	};
	recPerPage:number = 5;
	showPageNumbers :number[]; //for pagination
	linkdata :LinkData[];
	loadData :LinkData[] = [{
		id: 1,
		name: 'google link',
		description: 'test description 1',
		upvote: 5,
		link: 'http://google.com/',
		datetime: "1 July 2017",
		edit: false
	},
	{
		id: 2,
		name: 'yahoo link',
		description: 'test description 2',
		upvote: 3,
		link: 'http://yahoo.com/',
		datetime: "9 April 2016",
		edit: false
	},
	{
		id: 3,
		name: 'abc link',
		description: 'test description 3',
		upvote: 3,
		link: 'http://askdfj.com/',
		datetime: "9 April 2015",
		edit: false
	},
	{
		id: 4,
		name: 'abc link',
		description: 'test description 4',
		upvote: 4,
		link: 'http://askdfj.com/',
		datetime: "9 April 2014",
		edit: false
	},
	{
		id: 5,
		name: 'abc link',
		description: 'test description 5',
		upvote: 5,
		link: 'http://askdfj.com/',
		datetime: "9 April 2015",
		edit: false
	}
	];
	totalCount: number;
	constructor() { 
		this.page.current = 1;
		this.totalCount = this.loadData.length;
		this.linkdata = this.loadData;
		this.update_pagination(this.totalCount);
	}
	ngOnInit() {
	}
	//---------------------- pagination chnage ----------------------//
	updatePage(value){
		if(value != this.page.current){
			this.page.current = value;
			// service call for record of the page
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
		var index = this.linkdata.indexOf(this.linkdata[key], 0);
		if (index > -1) {
			this.linkdata.splice(index, 1);
		}
		this.totalCount = this.totalCount-1;
		this.update_pagination(this.totalCount);
	}
	edit(editId){
		// console.log(this.getIndex(editId));
		if(this.linkdata[editId-1].edit){
			this.linkdata[editId-1].edit = false;
		}
		else{
			this.linkdata[editId-1].edit = true;
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
