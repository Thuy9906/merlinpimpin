import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-name',
  templateUrl: './first-names.component.html',
  styleUrls: ['./first-names.component.scss']
})
export class FirstNamesComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      drinkPreference: ''
    });
  }

  onSubmitForm() {
    /*const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference']
    );*/
    console.log();
    this.router.navigate(['/child-area-dashboard']);
  }

}
