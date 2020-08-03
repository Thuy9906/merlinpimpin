
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gift } from '../../models/baby-registry/gift.model';
import { BabyRegistryService } from '../../services/baby-registry.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gift-form',
  templateUrl: './gift-form.component.html',
  styleUrls: ['./gift-form.component.scss']
})
export class GiftFormComponent implements OnInit {
  
  childAreaId : string;
  birthListForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
              private babyRegistryService: BabyRegistryService,
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
    this.babyRegistryService.addGiftItemOnServer(newGift);
    this.router.navigate(['/child-area-dashboard', 'view', this.childAreaId, 'baby-registry']);
  }
}

