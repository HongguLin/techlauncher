import {Component, Input, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'fullcalendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MyEvent} from '../my-event';
import {Npd} from '../npd';
import { NgModel } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import {forEach} from "@angular/router/src/utils/collection";
import {Observable} from "rxjs/Observable";
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { MatIconRegistry, MatTabChangeEvent } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";
import { datepickerLocale } from 'fullcalendar';
import { expand } from 'rxjs/operator/expand';

@Component({
  selector: 'app-project-roaster',
  templateUrl: './project-roaster.component.html',
  styleUrls: ['./project-roaster.component.css']
})
export class ProjectRoasterComponent implements OnInit {
  @ViewChild("rooster") dialogModal: TemplateRef<any>

  @ViewChild("deletePopWindow") deleteModal: TemplateRef<any>

  draggableListLeft = [
    {
      content: "Tom",
      effectAllowed: "move",
      disable: false,
      handle: false,
    },
    {
      content: "Hong",
      effectAllowed: "move",
      disable: false,
      handle: false,
    },
    {
      content: "Sally",
      effectAllowed: "copyMove",
      disable: false,
      handle: false
    },
    {
      content: "Bob",
      effectAllowed: "move",
      disable: false,
      handle: true,
    }
  ];

  draggableListRight = [
    {
      content: "Abby",
      effectAllowed: "move",
      disable: false,
      handle: false,
    }
  ];

  draggableListThird = [
    {
      content: "Todd",
      effectAllowed: "move",
      disable: false,
      handle: false,
    }
  ];


  layout:any;
  horizontalLayoutActive:boolean = false;
  private currentDraggableEvent:DragEvent;
  private currentDragEffectMsg:string;
  private readonly verticalLayout = {
    container: "row",
    list: "column",
    dndHorizontal: false
  };
  private readonly horizontalLayout = {
    container: "row",
    list: "row",
    dndHorizontal: true,
  };

  employees: any;
	holidays : any;
	npdIDs:any[];
  npds = [];
  fromDate :Date;
  toDate :Date;
  
  todayDate: Date;
  todaysday: Date;
  strDay: String;

  events = ['select', 'RDO', 'Annual Leave', 'Sick Leave', 'Other'];
  public model = new MyEvent(this.events[0]);
  radioBtn1: String;
  repeatVal: 0;
	initial: number;
	selectedEmployeeId:number;
  npd = new Npd(this.fromDate, this.toDate, this.model.event, this.selectedEmployeeId, 0);
  deletedEvent: any;



  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.setHorizontalLayout( this.horizontalLayoutActive );
    
  }

  setHorizontalLayout( horizontalLayoutActive:boolean ) {
   this.layout = (horizontalLayoutActive) ? this.horizontalLayout : this.verticalLayout;
 }

 onDragStart( event:DragEvent ) {

    this.currentDragEffectMsg = "";
    this.currentDraggableEvent = event;

  }

  onDragged( item:any, list:any[], effect:DropEffect ) {

    this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;

    if( effect === "move" ) {

      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }

  onDragEnd( event:DragEvent ) {

  this.currentDraggableEvent = event;
  }

  onDrop( event:DndDropEvent, list?:any[] ) {

    if( list
      && (event.dropEffect === "copy"
        || event.dropEffect === "move") ) {

      let index = event.index;

      if( typeof index === "undefined" ) {

        index = list.length;
      }

      list.splice( index, 0, event.data );
    }
  }


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
			},

      // public toDay = "";

      dayClick: (data, jsEvent, view) => {
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        this.fromDate = data.format();
        this.todayDate = this.fromDate;
        this.modalService.open(this.dialogModal,{size:'lg'});
        this.todaysday = data.day();
        this.strDay = days[Number(this.todaysday)]
      },

      eventClick: (calEvent, jsEvent, view) => {
		    this.deletedEvent.npd_id = calEvent.npd_id;
        this.modalService.open(this.deleteModal);
      },

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
