import { User } from './../../interfaces/user.interface';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
	constructor(public afa: AngularFireAuth, public afs: AngularFirestore) {}

	loadCurrentUser() {
		return this.afa.authState;
	}

	getUserById(userId) {
		return this.afs.collection<User>('Users').doc(userId).valueChanges();
	}
}
