import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private userService : UserService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      pseudo: ['', [Validators.required]],
      firstName : [''],
      lastName : ['']
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const pseudo = this.signupForm.get('pseudo').value;
    const firstName = this.signupForm.get('firstName').value;
    const lastName = this.signupForm.get('lastName').value;
    
    this.authService.createNewAuth(email, password).then(
      () => {
        this.userService.createUser(this.authService.authInfos.userId, email, pseudo, firstName, lastName).then(
          () => {
          }, (error) => {
          (error);
          }
        );
        this.router.navigate(['/child-list']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}