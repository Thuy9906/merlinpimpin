import { Component, OnInit } from '@angular/core';
import { ChildAreaService } from 'src/app/services/child-area.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-child-area-admin-view',
  templateUrl: './child-area-admin-view.component.html',
  styleUrls: ['./child-area-admin-view.component.scss']
})
export class ChildAreaAdminViewComponent implements OnInit {

  constructor(public childAreaService: ChildAreaService, private route : ActivatedRoute, 
              //private babyRegistryService : BabyRegistryService, 
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    
    // At each new user picker display, wait until resolvedMembers and resolvedAdmin is refreshed
    this.childAreaService.areMembersLoaded = false;
    this.childAreaService.isAdminLoaded = false;
    
    // Force refresh of child area service
    this.childAreaService.refresh(id);
  }

  /*onDelete() {
    this.router.navigate(['/child-dashboard']);
  }*/
  
  onDisplayBabyRegistry(){
    this.router.navigate(['/child-area-dashboard', 'manage', this.childAreaService.childArea.id, 'baby-registry']);
  }
  
  onDisplayLastNames(){
    this.router.navigate(['/child-area-dashboard', 'manage', this.childAreaService.childArea.id, 'first-names']);
  }
  
  onAddMember(){
    
  }
  
  toto(word : string){
    console.log(word);
  }

}
