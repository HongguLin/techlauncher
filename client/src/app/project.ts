export class Project {
	public project_id;
	public project_name;
	public country;
	public employees: any;
	public state;

	constructor(project_id:number, project_name:string, country:string, state:string, employees:any){
		this.project_id = project_id;
		this.project_name = project_name;
		this.country = country;
		this.state = state;
		this.employees = employees;
	}
}