import { Component, OnInit } from '@angular/core';
import { LinksTableService } from './links-table.service';
import { config, ConfigFunctions } from '../config';

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
	switch: boolean;
	constructor(linkstableservice: LinksTableService) { 
		this.linkstableservice = linkstableservice;
		this.page.current = 1;
		this.totalCount = 11;
	}
	ngOnInit() {
		//show all links
		this.linkstableservice.getLinks(1).subscribe(data =>{
			this.linkdata = data;
		});
		// update count for the total count
		this.linkstableservice.getTotalCount().subscribe(data =>{
			this.totalCount = data[0]['count'];
			this.update_pagination(this.totalCount);
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
	//---------------------- pagination chnage ----------------------//

	//---------------------- Switch Operation start ----------------------//
	switchView(){
		if(this.switch){
			console.log(true);
		}
		if(!this.switch){
			console.log(false);
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