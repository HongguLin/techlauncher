export class Npd {
    public start: Date
    public end: Date
    public reason: string
    public repeatDays: any;

    constructor(from:Date, to:Date, reason: string, repeat: any){
        this.start = new Date(from)
        this.end = new Date(to)
        this.reason = reason;
        this.repeatDays = repeat;
    }
}