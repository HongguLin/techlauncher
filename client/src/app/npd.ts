export class Npd {
    public start: Date;
    public end: Date;
    public reason: string;
    public employee: any;
    public repeatDays: any;

    constructor(from:Date, to:Date, reason:string, employee_id:number, repeat:any){
        this.start = new Date(from);
        this.end = new Date(to);
        this.reason = reason;
        this.employee = {"employee_id":employee_id};
        this.repeatDays = repeat;
    }
}