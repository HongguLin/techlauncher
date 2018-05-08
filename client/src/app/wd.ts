import {Time} from "@angular/common";

export class Wd {
	public day: Date;
	public startTime: Time;
	public finishTime: Time;
	public employee: any;

	constructor(day:Date, startTime:Time, finishTime:Time, employee_id:number){
		this.day = new Date(day);
		this.startTime = startTime;
		this.finishTime = finishTime;
		this.employee = {"employee_id":employee_id};
	}
}