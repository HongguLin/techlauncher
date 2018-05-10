
export class Wd {
	public day: Date;
	public startTime: Date;
	public finishTime: Date;
	public employee: any;

	constructor(day:Date, startTime:Date, finishTime:Date, employee_id:number){
		this.day = day;
		this.startTime = startTime;
		this.finishTime = finishTime;
		this.employee = {"employee_id":employee_id};
	}
}