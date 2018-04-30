import { User } from './../../interfaces/user.interface';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	email;
	password;
	constructor(
		public navCtrl: NavController,
		private afs: AngularFirestore,
		private afa: AngularFireAuth
	) {}

	createAccount(userEmail: string, password: string) {
		this.afa.auth.createUserWithEmailAndPassword(userEmail, password).then((infoUser) => {
			const user: User = {
				id: infoUser.uid,
				email: infoUser.email,
				password,
				events: []
			};
			this.afs.collection<User>('Users').doc(infoUser.uid).set(user);
			this.navCtrl.push('EventPage');
		});
	}
}
