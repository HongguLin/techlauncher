export class Npd {
	public start: Date
	public end: Date
	public reason: string
	constructor(from:Date, to:Date, reason: string){
		this.start = new Date(from)
		this.end = new Date(to)
		this.reason = reason;
	}


}