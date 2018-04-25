import {Component, Input, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'fullcalendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MyEvent} from '../my-event';
import {Npd} from '../npd';
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
  npds: any;
  fromDate :Date;
  toDate :Date;
  events = ['select', 'RDO', 'Annual Leave', 'Sick Leave', 'Other'];
  public model = new MyEvent(this.events[0]);
  radioBtn1: String;
  repeatVal: 0;
  npd = new Npd(this.fromDate, this.toDate, this.model.event, 0);
  initial: number;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) {
      this.repeatVal = 0;
      this.npd       = new Npd(this.fromDate, this.toDate, this.model.event, 0);
      this.initial   = -1;
  }

  //newEvent() {
		//this.model = new MyEvent('');
	//}

	getPublicHoliday() {
		this.http.get('http://localhost:8080/holidays?max=30').subscribe(data => {
			this.holidays = data;
			this.displayCalendar()
		});
	}

	getNonProductiveDay() {
		this.http.get('http://localhost:8080/npd?max=30').subscribe(data => {
			this.npds = data;
			this.displayCalendar()
		});
	}

	saveEvent(){
		//this.npd = new Npd(this.fromDate, this.toDate, this.model.event);
		this.http.post('http://localhost:8080/npd', this.npd)
			.subscribe(res => {
					let id = res['id'];
				}, (err) => {
					console.log(err);
				},
                () => {
                    this.getNonProductiveDay();
                }
			);
	}

  addEvent(){
    console.log('hello')
    
    $('#calendar').fullCalendar('renderEvent', {
      title: this.model.event,
	    start: this.fromDate,
	    end: this.toDate,
	    color: '#cc0000',
	    textColor: 'white',

    });


    if (this.radioBtn1 == 'always') {
        this.npd = new Npd(this.fromDate, this.toDate, this.model.event, 100);
		} else if (this.radioBtn1 == 'repeat') {
        this.npd = new Npd(this.fromDate, this.toDate, this.model.event, this.repeatVal);
		} else {
        this.npd = new Npd(this.fromDate, this.toDate, this.model.event, 1);
		}

	  this.saveEvent();
  }

	displayCalendar(){
  	var hds = this.holidays.map(holiday => {
  		return {
			  title: holiday.name,
			  start: holiday.start.split('T')[0],
			  end: holiday.end.split('T')[0],
			}
	  });

		if (this.npds != null) {
			var ndsWithRepeat = this.npds.map(npd => {
				return {
					title: npd.reason,
					start: npd.start.split('T')[0],
					end: npd.end.split('T')[0],
					repeat: npd.repeatDays
				}
			});

			var nds = [];
			for (var i = 0; i < ndsWithRepeat.length; i++) {
				for (var j = 0; j < ndsWithRepeat[i].repeat; j++) {
					var startDate = new Date(ndsWithRepeat[i].start);
					var endDate = new Date(ndsWithRepeat[i].end);

					startDate.setDate(startDate.getDate() + j * 7);
					endDate.setDate(endDate.getDate() + j * 7);

					nds.push({
						title: ndsWithRepeat[i].title,
						start: startDate,
						end:   endDate,
						color: '#cc0000',
					})
				}
			}
		}

		var allEvents = hds.concat(nds);
		$('#calendar').fullCalendar( {
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

			events: allEvents,

			loading: function(bool) {
				$('#loading').toggle(bool);
			}
		});

		$("#calendar").fullCalendar('removeEvents');
		$("#calendar").fullCalendar('addEventSource', allEvents);
  }

  toDateChange(event) {
    console.log('to', this.toDate)
  }

  ngOnInit() {
	  this.getPublicHoliday();
	  this.getNonProductiveDay();
  }

}
