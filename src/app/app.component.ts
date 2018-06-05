import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Event, Router, NavigationStart, NavigationEnd,NavigationCancel,NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showLoadingIndicator = true;
  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel 
        || routerEvent instanceof NavigationError  ) {
        this.showLoadingIndicator = false;
      }
    })
  }
  loadedFeature = 'recipe';
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "***************************************",
      authDomain: "***************************************",
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
