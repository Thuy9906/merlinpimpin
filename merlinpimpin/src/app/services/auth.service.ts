import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

export interface AuthInfos {
  isAuth: boolean;
  userId: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public authInfos: AuthInfos = {
      isAuth: false,
      userId: "",
      email: ""
    };
  public authSubject : Subject<AuthInfos> = new Subject<AuthInfos>();
  
  
  constructor() { 
    
    console.log('building AUTH service');
    
    //Subscribe to auth state observer
    //console.log('building auth service')
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          //console.log("auth state change");
          this.authInfos.isAuth = true;
          this.authInfos.userId = user.uid;
          this.authInfos.email = user.email;
        } else {
          this.authInfos.isAuth = false;
        }
        console.log('auth state changed');
        this.emitAuthInfos();
      }
    );
  }
  
  //Create new auth with email and password
  createNewAuth(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (auth) => {
            this.authInfos.userId = auth.user.uid;            
            this.authInfos.email = auth.user.email;
            //this.emitAuthInfos();
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  public emitAuthInfos() {
    this.authSubject.next(this.authInfos);
    console.log(this.authInfos);
  }
  
  signInUser(email: string, password: string) {
    console.log('signin user');
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  signOutUser() {
    firebase.auth().signOut();
  }
}
