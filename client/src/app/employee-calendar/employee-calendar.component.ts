import {Component, Input, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'fullcalendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.css']
})
export class EmployeeCalendarComponent implements OnInit {
  @ViewChild("content") dialogModal: TemplateRef<any>

  // #colon is for type and = is assignment
	holidays : any;
  fromDate = "";
  toDate = "";

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

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

      dayClick: (data, jsEvent, view) => {
        this.fromDate = data.format();
        this.toDate = data.format();
        this.modalService.open(this.dialogModal);
        console.log('from', this.fromDate)
      },

			displayEventTime: false, // don't show the time column in list view

			events: [
				{
					title  : 'event1',
					start  : '2018-03-08',
          end: '2016-03-10',
          description: 'This is a cool event'
				},
        {
          title: 'Long Event',
          start: '2018-03-07',
          end: '2018-03-10',
          color: 'purple' 
        },
			],
      eventColor: '#f4c542',

			loading: function(bool) {
				$('#loading').toggle(bool);
			}

		});
  }

  toDateChange(event) {
    console.log('to', this.toDate)
  }


  ngOnInit() {
		console.log("hello")
	  this.getPublicHoliday();
	  this.displayCalendar();

  }

}
