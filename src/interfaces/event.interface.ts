import { Guest } from './guest.interface';
export interface Event {
	id;
	name;
	tema;
	guests: Guest[];
}
