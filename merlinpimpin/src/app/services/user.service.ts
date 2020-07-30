import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

import * as firebase from 'firebase';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import { AuthService, AuthInfos } from './auth.service';

export const UserConverter = {
    toFirestore: function(user : User) {
        return {
            id: user.id,
            lastName: user.lastName,
            // parent: childArea.parent,
            firstName : user.firstName,
            emailAdress : user.emailAdress,
            pseudo: user.pseudo,
            avatarUrl: user.avatarUrl,
            photoUrl: user.photoUrl
          }
    },
    fromFirestore: function(snapshot : any, options : any){
        const data = snapshot.data(options);
        let user = new User();
        user.id = data.id;
        user.lastName = data.lastName;
        user.firstName = data.firstName;
        user.emailAdress = data.emailAdress;
        user.pseudo = data.pseudo;
        user.avatarUrl = data.avatarUrl;
        user.photoUrl = data.photoUrl;
        return user;
        
    }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : User = new User();
  userSubject = new Subject<User>();

  constructor(private authService : AuthService) {
    console.log('building user service');
//    // In case authentication is already over, directly refresh connected user
//    if(this.authService.authInfos.isAuth){
//      this.refreshUser(this.authService.authInfos.userId);
//    }
//    
    // Subscribe to auth info observer, to refresh connected user at any new authentication change
    this.authService.authSubject.subscribe(
      (authInfos: AuthInfos) => {
        if(authInfos.isAuth) {          
          //If is auth, retrieve user info from server
          this.refreshUser(authInfos.userId);
        }
      }
    );
    
    this.authService.emitAuthInfos();
  }
  
  public emitUser() {
    this.userSubject.next(this.user);
  }
  
  public refreshUser(userId: string){
    this.getUser(userId).then(
      (result : User) => {
        console.log('user heeeere')
        console.log(result);
        this.user = result;
        this.emitUser();
      });
  }
  
  public createUser(userId : string, email : string, firstName : string, lastName : string){
    return new Promise (
      (resolve, reject) =>{
        let user: User = new User();
        user.id = userId
        user.firstName = firstName
        user.pseudo = firstName + lastName.substring(0,1);
        user.lastName = lastName
        user.emailAdress = email;
        firebase.firestore().collection('user').doc(userId).withConverter(UserConverter).set(user).then(
          () => {
          console.log('new user' + userId);
          resolve();
          }, (error) => {
          reject(error);
          }
        )
      }
    );
  }
 
  getUser(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.firestore().collection('user').doc(id).withConverter(UserConverter).get().then(
          (userSnapshot: DocumentSnapshot) => {
            resolve(userSnapshot.data());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
  /* createNewUser(newUser: User) {
    return new Promise (
      (resolve, reject) =>{
      firebase.firestore().collection('user').doc().withConverter(UserConverter).set(newUser).then(
        () => {
        resolve();
        }, (error) => {
        reject(error);
      }
      )
      }
    );

  removeUser(userToRemove: User) {
    const childIndexToRemove = this.users.findIndex(
      (usersEl) => {
        if(usersEl === userToRemove) {
          return true;
        }
      }
    );
    this.users.splice(childIndexToRemove, 1);
    this.saveUsers();
    this.emitUsers();
  }
*/  
  
 
/*  saveUsers() {
    firebase.database().ref('/users').set(this.users);
  }
  getUsers() {
    firebase.database().ref('/child-list')
      .on('value', (data: DataSnapshot) => {
          this.users = data.val() ? data.val() : [];
          this.emitUsers();
        }
      );
  }*/

