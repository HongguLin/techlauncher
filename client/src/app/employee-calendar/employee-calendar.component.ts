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
  events = [
    {title  : 'reason',
    		start  : this.fromDate,
        end: this.toDate,
        description: 'This is a cool event'}]

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

	getPublicHoliday() {
		this.http.get('http://localhost:8080/holidays?max=30').subscribe(data => {
			this.holidays = data;
		});
	}

  addEvents(){
    console.log('hello')
    $('#calendar').fullCalendar('renderEvent', {
        title: 'dynamic event',
        start: this.fromDate,
        end: this.toDate,
        color: '#424bf4',
        textColor: 'white',
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

			// events: [
			// 	{
			// 		title  : 'reason',
			// 		start  : this.fromDate,
      //     end: this.toDate,
      //     description: 'This is a cool event'
			// 	},
      //   {
      //     title: 'Llksdjfldsjf',
      //     start: '2018-03-07',
      //     end: '2018-03-10',
      //     color: 'purple'
      //   },
			// ],
      // eventColor: '#f4c542',

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
