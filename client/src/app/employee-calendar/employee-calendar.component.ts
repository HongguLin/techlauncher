import {Component, Input, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'fullcalendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MyEvent} from '../my-event';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.css']
})
export class EmployeeCalendarComponent implements OnInit {
  @ViewChild("content") dialogModal: TemplateRef<any>

  @ViewChild("deletePopWindow") deleteModal: TemplateRef<any>

  // #colon is for type and = is assignment
	holidays : any;
  fromDate = "";
  toDate = "";
  events = ['select', 'RDO', 'Annual Leave', 'Sick Leave', 'Other'];
  public model = new MyEvent(this.events[0]);

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  newEvent() {
		this.model = new MyEvent('');
	}

	getPublicHoliday() {
		this.http.get('http://localhost:8080/holidays?max=30').subscribe(data => {
			this.holidays = data;
			this.displayCalendar()
		});

	}

  addEvents(){
    console.log('hello')
    
    $('#calendar').fullCalendar('renderEvent', {
      title: this.model.event,
       
        start: this.fromDate,
        end: this.toDate,
        color: '#cc0000',
        textColor: 'white',
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

      dayClick: (data, jsEvent, view) => {
        this.fromDate = data.format();
        this.toDate = data.format();
        this.modalService.open(this.dialogModal);
        console.log('from', this.fromDate)
      },
      
      eventClick: (calEvent, jsEvent, view) => {
        // alert('Event: ' + calEvent.title);
        this.modalService.open(this.deleteModal);  
      },

			displayEventTime: false, // don't show the time column in list view

			events: hds,

			loading: function(bool) {
				$('#loading').toggle(bool);
			}
		});
  }

  toDateChange(event) {
    console.log('to', this.toDate)
  }

  ngOnInit() {
	  this.getPublicHoliday();

  }

}
