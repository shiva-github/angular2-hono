import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-diary',
	templateUrl: './diary.component.html',
	styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
	update_year: number;
	updateMonth: string;
	monthCount: number;
	forWhiteSpaces;
	days:any;
	completeDiaryData: mainDiaryData;
	today: Date;
	constructor() {
		this.completeDiaryData = new mainDiaryData();
		this.days = Array();
		this.forWhiteSpaces = Array();
		this.update_year = new Date().getFullYear();
		this.monthCount = new Date().getMonth();
		this.updateCalendar(this.monthCount);
		this.today = new Date();
		console.log(this.today);
		console.log(this.completeDiaryData);

		// date fetch
		// this.main.recordDate = "fetchRecordData.date";
		// this.main.content = "This is content";
		// this.main.title = "this is title";
	}

	ngOnInit() {
	}
	// working area for date MSManipulationEvent
	getDateForRecordFetch(fetchRecordData):void{
		// console.log(fetchRecordData);
		var clickdate= fetchRecordData.date + fetchRecordData.month + fetchRecordData.year;
		this.completeDiaryData.recordDate = clickdate;
		this.completeDiaryData.content = "This is content";
		this.completeDiaryData.title = "this is title";
		console.log(this.completeDiaryData);
		console.log(new Date(clickdate))
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

	getStringMonth(num):string{
		var array = ["January", "February", "March", "April", "May",
		"June", "July", "August", "September", "October", "November", "December"];
		return array[num];
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
		this.updateMonth = this.getStringMonth(updatedMonthCount);
		var dateData = this.getDaysInMonth(updatedMonthCount,this.update_year);
		this.days = [];
		for(var i=0;i< dateData.length;i++){
			var object = new Object();
			object["day"] = dateData[i].toString().split(" ")[0];
			object["month"] = dateData[i].toString().split(" ")[1];
			object["date"] = dateData[i].toString().split(" ")[2];
			object["year"] = dateData[i].toString().split(" ")[3];
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