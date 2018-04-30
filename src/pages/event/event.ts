import { EventProvider } from './../../providers/event/event.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthenticationProvider } from './../../providers/authentication/authentication.provider';
import { Event } from './../../interfaces/event.interface';
import { User } from './../../interfaces/user.interface';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-event',
	templateUrl: 'event.html'
})
export class EventPage {
	user: User;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authenticationProvider: AuthenticationProvider,
		private eventService: EventProvider
	) {}
	ionViewDidLoad() {
		this.authenticationProvider.loadCurrentUser().subscribe((user) => {
			if (user) {
				this.authenticationProvider.getUserById(user.uid).subscribe((infoUser) => {
					this.user = <User>infoUser;
				});
			}
		});
	}

	modalCreateEvent() {
		this.eventService.modalCreateEvent(this.user);
	}

	showPageEventDetail(event: Event) {
		this.navCtrl.push('EventDetailPage', { event, user: this.user });
	}
}
