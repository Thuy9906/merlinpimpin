
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gift } from '../../../../../models/birth-list/gift.model';
import { BirthListService } from '../../../../../services/birth-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-birth-list-form',
  templateUrl: './birth-list-form.component.html',
  styleUrls: ['./birth-list-form.component.scss']
})
export class BirthListFormComponent implements OnInit {
  
  childAreaId : string;
  birthListForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private birthListService: BirthListService,
              private router: Router) { }
              
  ngOnInit() {    
    this.childAreaId = this.route.snapshot.params['id'];
    this.initForm();
  }
  
  initForm() {
    this.birthListForm = this.formBuilder.group({
      item: ['', Validators.required],
      quantity: '',
      brand: '',
      price: ''
    });
  }
  
  //Add gift on baby registry and redirect to baby registry
  onSaveGift() {
    const item = this.birthListForm.get('item').value;
    const quantity = this.birthListForm.get('quantity').value;
    const brand = this.birthListForm.get('brand').value;
    const price = this.birthListForm.get('price').value;
    const newGift = new Gift(item, quantity);
    newGift.price = price;
    newGift.brand = brand;
    this.birthListService.addGiftItemOnServer(newGift);
    this.router.navigate(['/child-dashboard', 'view', this.childAreaId, 'birth-list']);
  }
}

