import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildArea } from '../../../models/child-area.model';
import { ChildAreaDashboardService } from '../../../services/child-area-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-area-form',
  templateUrl: './child-area-form.component.html',
  styleUrls: ['./child-area-form.component.scss']
})
export class ChildAreaFormComponent implements OnInit {

  childAreaForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private childAreaDashboardService: ChildAreaDashboardService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.childAreaForm = this.formBuilder.group({
      dueDate: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  
  onSaveChildArea() {
    const dueDate = this.childAreaForm.get('dueDate').value;
    this.childAreaDashboardService.createChildArea(new ChildArea(dueDate, name));
    this.router.navigate(['/child-dashboard']);
  }
}

