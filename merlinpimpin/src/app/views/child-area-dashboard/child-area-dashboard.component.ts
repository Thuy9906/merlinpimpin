
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
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

  childAreasManaged: ChildArea[] = [];
  childAreasFollowed: ChildArea[] = [];
  childAreasFollowedSubscription: Subscription; 
  childAreasManagedSubscription: Subscription; 
  @Input() childAreaId : string;

  constructor(public childAreaDashboardService: ChildAreaDashboardService, private router: Router) {}
  ngOnInit(): void {    
    this.childAreasFollowedSubscription = this.childAreaDashboardService.childAreasFollowedSubject.subscribe(
      (childAreasFollowed: ChildArea[]) => {
        this.childAreasFollowed = childAreasFollowed;
      }
    );
    this.childAreaDashboardService.emitChildAreasFollowed();
    
    this.childAreasManagedSubscription = this.childAreaDashboardService.childAreasManagedSubject.subscribe(
      (childAreasManaged: ChildArea[]) => {
        this.childAreasManaged = childAreasManaged;
      }
    );
    this.childAreaDashboardService.emitChildAreasManaged();
    }
  
  

  onNewChild() {
    this.router.navigate(['/child-area-dashboard', 'new']);
  }

  onDeleteChild(childArea: ChildArea) {
    console.log(childArea.id);
    this.childAreaDashboardService.removeChildArea(childArea);
  }

  onManageChild(childArea: ChildArea) {      
    this.router.navigate(['/child-area-dashboard', 'manage', childArea.id]);
    
  } 
  onViewChild(childArea: ChildArea) {
    this.router.navigate(['/child-area-dashboard', 'view', childArea.id]);
  }
  ngOnDestroy() {
    this.childAreasManagedSubscription.unsubscribe();
    this.childAreasFollowedSubscription.unsubscribe();
  }
}