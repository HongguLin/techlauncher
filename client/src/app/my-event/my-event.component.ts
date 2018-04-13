
import { Component } from '@angular/core';

import { MyEvent} from '../my-event';

@Component({
	selector: 'app-my-event',
	templateUrl: './my-event.component.html',
	styleUrls: ['./my-event.component.css']
})
export class MyEventComponent {

	// Add the reasons here
	events = ['select', 'RDO', 'Annual Leave', 'Sick Leave', 'Other'];
	colors = ['red'];
	model = new MyEvent(this.events[0], this.colors[0]);

	newEvent() {
		this.model = new MyEvent('','');
	}


}

