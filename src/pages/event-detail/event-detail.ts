import { EventProvider } from './../../providers/event/event.provider';
import { User } from './../../interfaces/user.interface';
import { Event } from './../../interfaces/event.interface';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-event-detail',
	templateUrl: 'event-detail.html'
})
export class EventDetailPage {
	event: Event;
	user: User;
	constructor(public navParams: NavParams, private eventProvider: EventProvider) {
		this.event = navParams.get('event');
		this.user = navParams.get('user');
	}

	addGuest() {
		this.eventProvider.addGuest(this.event, this.user);
	}
}
