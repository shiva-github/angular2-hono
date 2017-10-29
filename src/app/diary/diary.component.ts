import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { DiaryService } from './diary.service';
import { config, ConfigFunctions } from '../config';

@Component({
	selector: 'app-diary',
	templateUrl: './diary.component.html',
	styleUrls: ['./diary.component.css'],
	providers: [DiaryService]
})
export class DiaryComponent implements OnInit {
	update_year: number;
	updateMonth: string;
	monthCount: number;
	forWhiteSpaces;
	days:any;
	completeDiaryData: mainDiaryData;
	today: Date;
	currentActiveDate:any;
	finalClickDate: string;
	listItems: any;
	recentActivity: any;


	constructor(private diaryService: DiaryService,private router: Router) {
		if(!ConfigFunctions.checkCookie("user")){
			this.router.navigate(['login']);	
		}

	}

	ngOnInit() {
		this.today = new Date();
		this.completeDiaryData = new mainDiaryData();
		this.days = Array();
		this.forWhiteSpaces = Array();
		this.update_year = new Date().getFullYear();
		this.monthCount = new Date().getMonth();
		this.currentActiveDate = new Date().getDate();
		this.updateCalendar(this.monthCount);
		
		// date fetch
		var clickdate= this.today.getDate()+" "+this.today.toString().split(" ")[1]+" "+this.today.getFullYear();
		this.finalClickDate = clickdate;
		this.completeDiaryData.recordDate = clickdate;
		this.completeDiaryData.content = "This is content";
		this.completeDiaryData.title = "this is title";


		// recent activity
		this.diaryService.getRecentRecords(5).subscribe(data =>{
			this.recentActivity = data;
		});

	}
	// working area for date MSManipulationEvent
	getDateForRecordFetch(fetchRecordData):void {
		
		this.days[this.currentActiveDate -1].activeClickDate = false;
		this.days[fetchRecordData.id].activeClickDate = true;
		this.currentActiveDate =  fetchRecordData.date;
		
		var clickdate= fetchRecordData.date +" "+ fetchRecordData.month +" "+ fetchRecordData.year;
		// this.completeDiaryData.recordDate = clickdate;
		this.finalClickDate = clickdate;
		let sendDate = new Date(clickdate);
		var mon = ("0" + (sendDate.getMonth()+1)).slice(-2);
		var dt = ("0" + sendDate.getDate()).slice(-2)
		let sendDate1 = sendDate.getFullYear()+"-"+mon+"-"+dt;

		//service call for getting data for the clicked date.
		this.diaryService.getDateContents(sendDate1).subscribe(data =>{
			this.listItems = data;
		});
	}
	populateItem(id){

		this.diaryService.populateDiaryContentForId(id).subscribe(data =>{
			this.completeDiaryData.content = data[0]["content"];
			this.completeDiaryData.title = data[0]["title"];	
			this.completeDiaryData.recordDate = ConfigFunctions.convertDate(data[0]["time"]);	
		});
		
	}


	// --------------- calendar updates start --------------- 
	update_yr(updatedyear){
		this.update_year = this.update_year + updatedyear;
		this.updateCalendar(this.monthCount);
	}
	update_mon(updateValue){
		this.monthCount = this.monthCount + updateValue;
		if(this.monthCount == -1){
			this.monthCount = 11;	
		}
		this.monthCount = this.monthCount % 12;
		this.updateCalendar(this.monthCount);
	}
	getNumWeekDay(day):number{
		var array = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
		return array.indexOf(day);
	}
	getDaysInMonth(month, year) {
		var date = new Date(year, month, 1);
		var days = [];
		while (date.getMonth() === month) {
			days.push(new Date(date));
			date.setDate(date.getDate() + 1);
		}
		return days;
	}
	updateCalendar(updatedMonthCount){
		var date1 = new Date(new Date().setMonth(updatedMonthCount));

		this.updateMonth = date1.toString().split(" ")[1];
		var dateData = this.getDaysInMonth(updatedMonthCount,this.update_year);
		this.days = [];
		for(var i=0;i< dateData.length;i++){
			var object = new Object();
			object["id"] = i;
			object["day"] = dateData[i].toString().split(" ")[0];
			object["month"] = dateData[i].toString().split(" ")[1];
			object["date"] = dateData[i].toString().split(" ")[2];
			object["year"] = dateData[i].toString().split(" ")[3];
			object["activeCurrentDate"] =  false;
			object["activeClickDate"] =  false;
			
			if(this.today.getDate() == object["date"] 
				&& this.today.toString().split(" ")[1] == object["month"]
				&& this.today.getFullYear() == object["year"]
				){
				
				object["activeCurrentDate"] =  true;
		}
		this.days[i] = object; 

	}

	var numberforWhiteSpaces = this.getNumWeekDay(this.days[0]["day"]);
	this.forWhiteSpaces = [];
	for(i=0;i< numberforWhiteSpaces;i++){
		this.forWhiteSpaces[i] = i;
	}
}
// --------------- calendar updates end --------------- 


}
export class mainDiaryData {
	recordDate: string;
	title: string;
	content: string;
}
