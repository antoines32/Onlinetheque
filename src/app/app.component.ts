import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Onlinetheque';
  constructor() {
    const config = {
      apiKey: 'AIzaSyDAROtU6JBuouLfc-iI3Dk1l_0dDrBBBRk',
      authDomain: 'onlinetheque.firebaseapp.com',
      databaseURL: 'https://onlinetheque.firebaseio.com',
      projectId: 'onlinetheque',
      storageBucket: 'onlinetheque.appspot.com',
      messagingSenderId: '1006143835832'
    };
    firebase.initializeApp(config);
  }
}
