import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BirthListService } from 'src/app/services/birth-list.service';
import { ChildAreaService } from 'src/app/services/child-area.service';

@Component({
  selector: 'app-birth-list',
  templateUrl: './birth-list.component.html',
  styleUrls: ['./birth-list.component.scss']
})
export class BirthListComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, 
              private router: Router,
              private childAreaService: ChildAreaService,
              public birthListService: BirthListService) { }

  ngOnInit(): void {    
    const id = this.route.snapshot.params['id'];
    console.log('building birthlist COMPONENT with id' + id);
    if (!this.childAreaService.isLoaded() || this.childAreaService.childArea.id !== id) {
      this.childAreaService.refresh(id);
    }
  }
  
  onAddItem(){
    this.router.navigate(['/child-dashboard', 'view', this.route.snapshot.params['id'], 'birth-list', 'new-gift']);
  }
}
