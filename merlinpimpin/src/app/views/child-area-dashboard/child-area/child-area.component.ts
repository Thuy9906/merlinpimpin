
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChildAreaService } from 'src/app/services/child-area.service';
import { BirthListService } from 'src/app/services/birth-list.service';
//import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-child-area',
  templateUrl: './child-area.component.html',
  styleUrls: ['./child-area.component.scss']
})
export class ChildAreaComponent implements OnInit {

  constructor(public childAreaService: ChildAreaService, private route : ActivatedRoute, private birthListService : BirthListService, 
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (!this.childAreaService.isLoaded() || this.childAreaService.childArea.id !== id) {
      this.childAreaService.refresh(id);
      console.log('refreshed');
    }
  }

  /*onDelete() {
    this.router.navigate(['/child-dashboard']);
  }*/
  
  onDisplayBirthList(){
    console.log('new birth list');
    this.router.navigate(['/child-dashboard', 'view', this.childAreaService.childArea.id, 'birth-list']);
  }
  
  onDisplayLastNames(){
    console.log('new last names');
    this.router.navigate(['/child-dashboard', 'view', this.childAreaService.childArea.id, 'first-names']);
  }
  
  onAddMember(){
    
  }
}