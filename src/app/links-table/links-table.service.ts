import { Injectable } from '@angular/core';
import { LinkData } from './links-table.component';

@Injectable()
export class LinksTableService {

	constructor() { }
	getLinks(pageNumber): LinkData[] {

		var loadData :LinkData[];		
		if(pageNumber == 1){
			loadData  = [{
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
		}else{
			loadData  = [{
				id: 6,
				name: 'google link',
				description: 'test description 6',
				upvote: 5,
				link: 'http://google.com/',
				datetime: "6 July 2017",
				edit: false
			},
			{
				id: 7,
				name: 'yahoo link',
				description: 'test description 7',
				upvote: 3,
				link: 'http://yahoo.com/',
				datetime: "9 April 7016",
				edit: false
			},
			{
				id: 8,
				name: 'abc link',
				description: 'test description 8',
				upvote: 8,
				link: 'http://askdfj.com/',
				datetime: "9 April 2015",
				edit: false
			},
			{
				id: 9,
				name: 'abc link',
				description: 'test description 9',
				upvote: 9,
				link: 'http://askdfj.com/',
				datetime: "9 April 2014",
				edit: false
			},
			{
				id: 10,
				name: 'abc link',
				description: 'test description 10',
				upvote: 10,
				link: 'http://askdfj.com/',
				datetime: "9 April 20110",
				edit: false
			}
			];
		}
		
		return loadData;
	}
	getTotalCount(){
		return 10;
	}
	deleteLink(recordNumber){
		console.log(recordNumber+"record deleted...");
	}
}
