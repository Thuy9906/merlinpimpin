import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BabyRegistryService } from 'src/app/services/baby-registry.service';
import { ChildAreaService } from 'src/app/services/child-area.service';

@Component({
  selector: 'app-baby-registry',
  templateUrl: './baby-registry.component.html',
  styleUrls: ['./baby-registry.component.scss']
})
export class BabyRegistryComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, 
              private router: Router,
              private childAreaService: ChildAreaService,
              public babyRegistryService: BabyRegistryService) { }

  ngOnInit(): void {    
    const id = this.route.snapshot.params['id'];
    if (!this.childAreaService.isLoaded() || this.childAreaService.childArea.id !== id) {
      this.childAreaService.refresh(id);
    }
  }
  
  onAddItem(){
    this.router.navigate(['/child-area-dashboard', 'view', this.route.snapshot.params['id'], 'baby-registry', 'new-gift']);
  }
}
