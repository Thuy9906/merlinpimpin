
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChildAreaDashboardService } from '../../services/child-area-dashboard.service';
import { ChildArea } from '../../models/child-area.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-area-dashboard',
  templateUrl: './child-area-dashboard.component.html',
  styleUrls: ['./child-area-dashboard.component.scss']
})
export class ChildAreaDashboardComponent implements OnInit, OnDestroy {

  childAreas: ChildArea[] = [];
  childAreasSubscription: Subscription; 

  constructor(public childAreaDashboardService: ChildAreaDashboardService, private router: Router) {}
  ngOnInit(): void {
    console.log('building child list');
    this.childAreasSubscription = this.childAreaDashboardService.childAreasSubject.subscribe(
      (childAreas: ChildArea[]) => {
        console.log("here:" + childAreas)
        this.childAreas = childAreas;
      }
    );
    this.childAreaDashboardService.emitChildAreas();
    }
  
  

  onNewChild() {
    this.router.navigate(['/child-dashboard', 'new']);
  }

  /*onDeleteChild(childArea: ChildArea) {
    console.log(childArea.id);
    this.childAreaDashboardService.removeChildArea(childArea);
  }*/

  onViewChild(childArea: ChildArea) {
    this.router.navigate(['/child-dashboard', 'view', childArea.id]);
  }
  
  ngOnDestroy() {
    this.childAreasSubscription.unsubscribe();
  }
}