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
			this.displayCalendar()
		});

	}

	displayCalendar(){
  	var hds = this.holidays.map(holiday => {
  		return {
			  title: holiday.name,
			  start: holiday.start.split('T')[0],
			  end: holiday.end.split('T')[0]
			}
	  });


		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,listYear'
			},

			displayEventTime: false, // don't show the time column in list view

			events: hds,

			dayClick: function(date, jsEvent, view) {
				//add pop up window inside
				// Get the modal
				var modal = document.getElementById('myModal');
				var span = document.getElementsByClassName("close")[0];

				// When the user clicks on <span> (x), close the modal
				span.onclick = function() {
					modal.style.display = "none";
				}


				// When the user clicks the button, open the modal

				modal.style.display = "block";

				window.onclick = function(event) {
					if (event.target == modal) {
						modal.style.display = "none";
					}
				}


				//alert('Clicked on: ' + date.format());

			},

			loading: function(bool) {
				$('#loading').toggle(bool);
			}


		});
  }

	
  ngOnInit() {
		console.log("hello")
	  this.getPublicHoliday();

  }

}
