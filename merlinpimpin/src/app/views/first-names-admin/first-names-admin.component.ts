import { Component, OnInit } from '@angular/core';
import { ChildAreaService } from 'src/app/services/child-area.service';
import { ActivatedRoute } from '@angular/router';
import { FirstNamesService } from 'src/app/services/first-names.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirstNameProposal } from 'src/app/models/first-names/first-names.model';

@Component({
  selector: 'app-first-names-admin',
  templateUrl: './first-names-admin.component.html',
  styleUrls: ['./first-names-admin.component.scss']
})
export class FirstNamesAdminComponent implements OnInit {

  userForm : FormGroup
  constructor(private route: ActivatedRoute, 
              public childAreaService: ChildAreaService,
              public firstNamesService : FirstNamesService, 
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.childAreaService.refresh(id);
    /*if (!this.childAreaService.isLoaded() || this.childAreaService.childArea.id !== id) {
      
    }*/
    console.log(this.firstNamesService.firstNames);
    this.initForm();
  }
  
  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required]
    });
  }
  
  onAddFirstName(){
    const firstNameProposed = this.userForm.get('firstName').value;
    const firstname = new FirstNameProposal(firstNameProposed);
    console.log("JE SUIS LA");
    this.firstNamesService.addFirstNameOnServer(firstname);
    //this.router.navigate(['/child-area-dashboard', 'view', this.childAreaId, 'baby-registry']);
  }
  
  onChangeFirstName(){
    
  }
  onDeleteFirstName(){
    
  }
}
