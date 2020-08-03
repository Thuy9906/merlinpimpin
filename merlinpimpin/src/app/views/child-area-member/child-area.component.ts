
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChildAreaService } from 'src/app/services/child-area.service';
//import { BabyRegistryService } from 'src/app/services/baby-registry.service';

@Component({
  selector: 'app-child-area',
  templateUrl: './child-area.component.html',
  styleUrls: ['./child-area.component.scss']
})
export class ChildAreaComponent implements OnInit {

  constructor(public childAreaService: ChildAreaService, private route : ActivatedRoute, 
              //private babyRegistryService : BabyRegistryService, 
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (!this.childAreaService.isLoaded() || this.childAreaService.childArea.id !== id) {
      this.childAreaService.refresh(id);
    }
  }

  /*onDelete() {
    this.router.navigate(['/child-dashboard']);
  }*/
  
  onDisplayBirthList(){
    this.router.navigate(['/child-area-dashboard', 'view', this.childAreaService.childArea.id, 'baby-registry']);
  }
  
  onDisplayLastNames(){
    this.router.navigate(['/child-area-dashboard', 'view', this.childAreaService.childArea.id, 'first-names']);
  }
    
  toto(word : string){
    console.log(word);
  }
}