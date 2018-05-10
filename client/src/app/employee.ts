export class Employee {
	public employee_name: any;
	public project: any;

	constructor(employee_name:string, project_id:number){
		this.employee_name = employee_name;
		this.project = {"project_id":project_id};

	}
}