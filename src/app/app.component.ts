import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 loadedFeature='recipe';
 ngOnInit(){
  firebase.initializeApp({
    apiKey: "Put your own api key here from firebase",
    authDomain: "Put your own domain from firebase",
  });
 }

 onNavigate(feature:string){
    this.loadedFeature=feature;
 }
}
