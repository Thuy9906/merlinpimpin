import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'merlinpimpin';
  constructor(){
    // Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC2O2okfzK7YGFsZZaV5cS4CPTOVRWOiYk",
    authDomain: "merlinpimpin.firebaseapp.com",
    databaseURL: "https://merlinpimpin.firebaseio.com",
    projectId: "merlinpimpin",
    storageBucket: "merlinpimpin.appspot.com",
    messagingSenderId: "584456177411",
    appId: "1:584456177411:web:e8163a8149f92bb9f78b36",
    measurementId: "G-1N6281QHFB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  }
}
