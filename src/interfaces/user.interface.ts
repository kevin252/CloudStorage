import { Event } from './event.interface';
export interface User {
	id;
	email;
	password;
	events: Event[];
}
