import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'fullcalendar';
@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.css']
})
export class EmployeeCalendarComponent implements OnInit {

	holidays:any;

  constructor(private http: HttpClient) { }

	getPublicHoliday() {
		this.http.get('http://localhost:8080/holidays?max=30').subscribe(data => {
			this.holidays = data;
		});
	}

	displayCalendar(){
  	console.log(this.holidays)
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,listYear'
			},

			displayEventTime: false, // don't show the time column in list view

			events: [
				{
					title  : 'event1',
					start  : '2018-03-01'
				}
			],

			loading: function(bool) {
				$('#loading').toggle(bool);
			}

		});
  }



  ngOnInit() {
		console.log("hello")
	  this.getPublicHoliday();
	  this.displayCalendar();

  }

}
