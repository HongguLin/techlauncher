import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'fullcalendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-roaster',
  templateUrl: './project-roaster.component.html',
  styleUrls: ['./project-roaster.component.css']
})
export class ProjectRoasterComponent implements OnInit {

	holidays : any;

  constructor(private http: HttpClient,
              private modalService: NgbModal) { }

	displayCalendar(){
		var hds = this.holidays.map(holiday => {
			return {
				title: holiday.name,
				start: holiday.start.split('T')[0],
				end: holiday.end.split('T')[0]
			}
		});

		$('#calendar').fullCalendar( {
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,listYear'
			},

			displayEventTime: false, // don't show the time column in list view

			events: hds,

			loading: function(bool) {
				$('#loading').toggle(bool);
			}
		});

	}
	getPublicHoliday() {
		this.http.get('http://localhost:8080/holidays?max=30').subscribe(data => {
			this.holidays = data;
			this.displayCalendar()
		});
	}

	ngOnInit() {
		this.getPublicHoliday();
	}

}
