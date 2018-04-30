import { Injectable } from '@angular/core';

import { Event } from './../../interfaces/event.interface';
import { User } from './../../interfaces/user.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Guest } from '../../interfaces/guest.interface';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
	constructor(
		private afs: AngularFirestore,
		public alertCtrl: AlertController,
		public afstorage: AngularFireStorage,
		public cameraPlugin: Camera
	) {
		console.log('Hello EventProvider Provider');
	}

	modalCreateEvent(user: User) {
		let prompt = this.alertCtrl.create({
			title: 'New event',
			inputs: [
				{
					name: 'name',
					placeholder: 'Nombre'
				},
				{
					name: 'tema',
					placeholder: 'Tema'
				}
			],
			buttons: [
				{
					text: 'Save',
					handler: (data) => {
						this.createEvent(data.name, data.tema, user);
					}
				}
			]
		});
		prompt.present();
	}

	createEvent(name: string, tema: string, user: User) {
		const id = this.afs.createId();
		const event: Event = {
			id,
			name,
			tema,
			guests: []
		};
		user.events.push(event);
		this.afs.collection<User>('Users').doc(user.id).update(user);
	}

	addGuest(event: Event, user: User) {
		let prompt = this.alertCtrl.create({
			title: 'Add Guest',
			inputs: [
				{
					name: 'name',
					placeholder: 'Nombre'
				}
			],
			buttons: [
				{
					text: 'Save',
					handler: (data) => {
						this.takePicture(data.name, event, user);
					}
				}
			]
		});
		prompt.present();
	}
	takePicture(name: string, event: Event, user: User) {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.cameraPlugin.DestinationType.DATA_URL,
			encodingType: this.cameraPlugin.EncodingType.JPEG,
			mediaType: this.cameraPlugin.MediaType.PICTURE,
			saveToPhotoAlbum: true
		};
		this.cameraPlugin.getPicture(options).then(
			(imageData) => {
				// imageData is either a base64 encoded string or a file URI
				// If it's base64:
				const id = this.afs.createId();

				this.afstorage
					.ref(id)
					.putString(imageData, 'base64', { contentType: 'image/png' })
					.then((infoImage) => {
						const guest: Guest = {
							name: name,
							image: infoImage.metadata.downloadURLs[0],
							imageId: id
						};
						event.guests.push(guest);
						this.afs.collection('Users').doc(user.id).update(user);
					});
			},
			(err) => {
				// Handle error
			}
		);
	}
}
