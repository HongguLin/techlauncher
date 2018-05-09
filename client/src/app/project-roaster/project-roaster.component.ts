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
import {Wd} from '../wd';
import {Time} from "@angular/common";

@Component({
  selector: 'app-project-roaster',
  templateUrl: './project-roaster.component.html',
  styleUrls: ['./project-roaster.component.css']
})
export class ProjectRoasterComponent implements OnInit {
  @ViewChild("rooster") dialogModal: TemplateRef<any>

  @ViewChild("deletePopWindow") deleteModal: TemplateRef<any>

  draggableListLeft = [];

  draggableListRight = [];

  draggableListThird = [];


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

  projects: any;
  currentProject:any;
  currentProjectEmployees=[];
  currentProjectEmployeesNpds = {};
  currentProjectEmployeesWds = {};

  otherProjects:any;
  otherProjectsEmployees = [];
	otherProjectsEmployeesNpds = {};
	otherProjectsEmployeesWds = {};


	holidays : any;
  todayDate: any;
  todaysday: any;
  strDay: String;
  radioBtn1: String;
  repeatVal: 0;
	selectedProjectId:number;
  deletedEvent: any;

  startTime: Time;
  finishTime: Time;
  currentSelectedEmployee:any;
	wd:any;




  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.setHorizontalLayout( this.horizontalLayoutActive );
    this.currentProjectEmployees = [];
    
  }

  setHorizontalLayout( horizontalLayoutActive:boolean ) {
   this.layout = (horizontalLayoutActive) ? this.horizontalLayout : this.verticalLayout;
 }

  onDragStart( event:DragEvent ) {

    this.currentDragEffectMsg = "";
    this.currentDraggableEvent = event;

  }

  onDragged( item:any, list:any[], effect:DropEffect ) {
	  console.log(this.todayDate);
	  console.log(this.todaysday);
	  console.log(typeof this.todayDate);

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


	getProjects(){
		this.http.get('http://localhost:8080/project?max=30').subscribe(data=>{
			this.projects = data;
		});
	}

	getProject(){
		this.http.get('http://localhost:8080/project/'+this.selectedProjectId).subscribe(data=>{
			//current project
			this.currentProject = data;
			var employeesID = this.currentProject["employees"];
			employeesID.forEach(data=>{
				var id = data["employee_id"];
				this.getCurrentEmployee(id);
			});

			//other projects
			this.otherProjects = this.projects.filter(project => project["project_id"]!=this.currentProject["project_id"]);
			this.otherProjects.forEach(project=>{
				var employeesID = project["employees"];
				employeesID.forEach(data=>{
					var id = data["employee_id"];
					this.getOtherEmployee(id);
				})
			});

		});
	}

	getCurrentEmployee(i){
		var npdays = [];
		var wdays = [];
		var name = '';

		this.http.get('http://localhost:8080/employee/'+i).subscribe(data=>{
			this.currentProjectEmployees.push(data);
			console.log(this.currentProjectEmployees);
			name = data['employee_name'];

			//get npds for available employee obtain
			if(data['npds'].length>0){
				data['npds'].forEach((npdid, index) =>{
					console.log('index:',index);
					console.log('length:',data['npds'].length);
					var x = this.getnpd(npdid['npd_id'],npdays);
					if(index+1==data['npds'].length){
						this.currentProjectEmployeesNpds[name]=npdays;
						console.log(this.currentProjectEmployeesNpds)
					}
				});
			}else {
				this.currentProjectEmployeesNpds[name]=[];
			}


			//get wds for assigned employee obtain
			if(data['wds'].length>0){
				data['wds'].forEach((wdid, index) =>{
					console.log('index:',index);
					console.log('length:',data['wds'].length);
					var y = this.getnpd(wdid['wd_id'],wdays);
					if(index+1==data['wds'].length){
						this.currentProjectEmployeesWds[name]=wdays;
						console.log(this.currentProjectEmployeesWds)
					}
				});
			}else {
				this.currentProjectEmployeesWds[name]=[];
			}

		});
	}

	getOtherEmployee(i){
		var npdays = [];
		var wdays = [];
		var name = '';

		this.http.get('http://localhost:8080/employee/'+i).subscribe(data=>{
			this.otherProjectsEmployees.push(data);
			console.log(this.otherProjectsEmployees);
			name = data['employee_name'];

			//get npds for available employee obtain
			if(data['npds'].length>0){
				data['npds'].forEach((npdid, index) =>{
					console.log('index:',index);
					console.log('length:',data['npds'].length);
					var x = this.getnpd(npdid['npd_id'],npdays);
					if(index+1==data['npds'].length){
						this.otherProjectsEmployeesNpds[name]=npdays;
						console.log(this.otherProjectsEmployeesNpds)
					}
				});
			}else {
				this.otherProjectsEmployeesNpds[name]=[];
			}

			//get wds for assigned employee obtain
			if(data['wds'].length>0){
				data['wds'].forEach((wdid, index) =>{
					console.log('index:',index);
					console.log('length:',data['wds'].length);
					var y = this.getnpd(wdid['wd_id'],wdays);
					if(index+1==data['wds'].length){
						this.otherProjectsEmployeesWds[name]=wdays;
						console.log(this.otherProjectsEmployeesWds)
					}
				});
			}else {
				this.otherProjectsEmployeesWds[name]=[];
			}

		});
	}

	//get available employee for today and assign them to the available draggable list
	getAvailability(available, npdays,today,employee_name){
		console.log('today:',today);
		console.log('npdays:',npdays);
		console.log(npdays.includes(today));
		if(!npdays.includes(today) && !available.includes(employee_name)){
			available.push(employee_name);
			this.draggableListRight.push(
				{
					content: employee_name,
					effectAllowed: "move",
					disable: false,
					handle: false,
				}
			)
		}
		console.log(available);
	}

	//get assigned employee for current project on today and assign them to the assigned to today draggable list
	getAssigned(assigned, wdays,today,employee_name){
		console.log('today:',today);
		console.log('wdays:',wdays);
		console.log(wdays.includes(today));
		if(wdays.includes(today) && !assigned.includes(employee_name)){
			assigned.push(employee_name);
			this.draggableListLeft.push(
				{
					content: employee_name,
					effectAllowed: "move",
					disable: false,
					handle: false,
				}
			)
		}
		console.log(assigned);
	}


	getOtherProAvailability(available, npdays, today, employee_name){
		console.log('today:',today);
		console.log('npdays:',npdays);
		console.log(npdays.includes(today));
		if(!npdays.includes(today) && !available.includes(employee_name)){
			available.push(employee_name);
			this.draggableListThird.push(
				{
					content: employee_name,
					effectAllowed: "move",
					disable: false,
					handle: false,
				}
			)

		}
		console.log(available);
	}

	getnpdays(npd, npdays){
		var start = new Date(npd['start'].split('T')[0]);
		var end = new Date(npd['end'].split('T')[0]);
		var repeat = npd['repeatDays'];
		var timeDiff = Math.abs(end.getTime() - start.getTime());
		var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
		for(var i=0;i<=repeat;i++){
			for(var j=0;j<=dayDiff;j++){
				var result = start;
				result.setDate(result.getDate() + j + i*7);
				if(result.getMonth()+1<10){
					var mon = '0'+ (result.getMonth()+1);
				}else {var mon = ''+(result.getMonth()+1);}
				if(result.getDate()<10){
					var date = '0'+result.getDate();
				}else {var date = ''+result.getDate();}
				npdays.push(result.getFullYear()+"-"+mon+"-"+date);
				console.log(npdays);
			}
		}
	}

	getnpd(i,npdays){
		this.http.get('http://localhost:8080/npd/'+i).subscribe(data=>{
			this.getnpdays(data, npdays);
		});
		return true
	}

	getwdays(wd, wdays){
		var day = new Date(wd['day'].split('T')[0]);

		if(day.getMonth()+1<10){
			var mon = '0'+ (day.getMonth()+1);
		}else {var mon = ''+(day.getMonth()+1);}
		if(day.getDate()<10){
			var date = '0'+day.getDate();
		}else {var date = ''+day.getDate();}
		wdays.push(day.getFullYear()+"-"+mon+"-"+date);
		console.log(wdays);
	}

	getwd(i,wdays){
		this.http.get('http://localhost:8080/wd/'+i).subscribe(data=>{
			this.getwdays(data, wdays);
		});
		return true
	}


	/*
	when drag the employee from available list to assigned to today list,
	trigger this function to add workday to the employee being dragged

	To Do:
	obtain startTime
	obtain finishTime
	obtain the id of the employee being dragged
	*/
	saveworkday(){
		//need to set up (this.startTime, this.finishTime, this.currentSelectedEmployee) first
		this.wd = new Wd(this.todayDate, this.startTime, this.finishTime, this.currentSelectedEmployee);
		this.http.post('http://localhost:8080/wd', this.wd)
			.subscribe(res => {let id = res['id'];
				}, (err) => {
					console.log(err);
				}
			);
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
				this.draggableListRight = [];
				this.draggableListThird = [];
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        this.todayDate = data.format();
        var today = data.format();
        this.modalService.open(this.dialogModal,{size:'lg'});
        this.todaysday = data.day();
        this.strDay = days[Number(this.todaysday)];
        var available=[];
        var assigned=[];
        var otherProAvailable = [];

        //get assign to current project employee on today (left draggable list)
	      for(var key in this.currentProjectEmployeesWds){
		      this.getAssigned(assigned,this.currentProjectEmployeesWds[key],today, key);
	      }

	      //get available employee in current project on today (middle draggable list)
	      for (var key in this.currentProjectEmployeesNpds){
		      console.log(key, this.currentProjectEmployeesNpds[key]);
		      this.getAvailability(available, this.currentProjectEmployeesNpds[key],today, key);
	      }

	      //get available employee on other project on today (right draggable list)
	      for(var key in this.otherProjectsEmployeesNpds){
		      console.log(key, this.otherProjectsEmployeesNpds[key]);
		      this.getOtherProAvailability(otherProAvailable, this.otherProjectsEmployeesNpds[key], today, key);
	      }
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
		this.getProjects();
	}

}
