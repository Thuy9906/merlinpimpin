import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChildArea } from '../models/child-area.model';

import * as firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import { ChildAreaService } from './child-area.service';
import {childAreaConverter} from './child-area.service';
import { UserService } from './user.service';
//import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ChildAreaDashboardService {
  public ischildAreasManagedLoaded = false;
  public ischildAreasFollowedLoaded = false;
  private childAreasManaged: ChildArea[] = [];
  private childAreasFollowed: ChildArea[] = [];
  public childAreasManagedSubject = new Subject<ChildArea[]>();
  public childAreasFollowedSubject = new Subject<ChildArea[]>();

  constructor(private childAreaService: ChildAreaService, public userService : UserService) {
    
    this.userService.userSubject.subscribe(
      () => {
        if(this.userService.user.isDefined()){
          this.refreshChildAreas();
        }
      }
    )
    this.userService.emitUser()
  }
  
  public emitChildAreasManaged() {
    this.childAreasManagedSubject.next(this.childAreasManaged);
  }
  
  public emitChildAreasFollowed() {
    this.childAreasFollowedSubject.next(this.childAreasFollowed);
  }
  
  public createChildArea(newChildArea: ChildArea) {
    this.createChildAreaOnServer(newChildArea).then(
      () =>{
        this.childAreasManaged.push(newChildArea);
      }
    );
  }
  
  private  createChildAreaOnServer(newChildArea: ChildArea) {
    return new Promise (
      (resolve, reject) =>{
      firebase.firestore().collection('child-area-dashboard').doc(newChildArea.id).withConverter(childAreaConverter).set(newChildArea).then(
        () => {          
//        Set current user's permission as admin
          this.childAreaService.addAdmin(this.userService.user.id, newChildArea.id);
          this.emitChildAreasManaged();
        resolve();
        }, (error) => {
        reject(error);
      }
      )
      }
    );
  }
  
  /**
   * Refreshes childAreas attribute and emit the associated subject
  */
   
  private refreshChildAreas(){
    this.ischildAreasManagedLoaded = false;
    this.ischildAreasFollowedLoaded = false;
    this.childAreasManaged = [];
    this.childAreasFollowed = [];
        
    // Retrieve child areas managed
    this.getChildAreasManaged().then((result: ChildArea[]) => {
        result.forEach(element=>{
            this.childAreasManaged.push(element)
          });
        this.ischildAreasManagedLoaded = true;        
        this.emitChildAreasManaged();       
      });
      
    // Retrieve child areas followed
    this.getChildAreasFollowed().then((result: ChildArea[]) => {
        result.forEach(element=>{
            this.childAreasFollowed.push(element)
          });
        this.ischildAreasFollowedLoaded = true;
        this.emitChildAreasFollowed();
      });
  }
  
  /**
   * Retrieve child areas managed on database
   */
  
  private getChildAreasManaged(): Promise<ChildArea[]> {
    return new Promise((resolve) => {
         firebase.firestore().collection('child-area-dashboard')
          .withConverter(childAreaConverter)
          .where('admin', '==', this.userService.user.id)
          .get()
          .then((childAreasSnapshot: QuerySnapshot) => {
              let result: any[] = [];
              childAreasSnapshot.forEach(function(childSnapshot) {
                    // childData will be the actual contents of the child
                    result.push(childSnapshot.data());
                });
              resolve(result);
            }
          );
      });   
  }
  
  /**
   * Retrieve child areas followed on database
   */
  
  private getChildAreasFollowed(): Promise<ChildArea[]> {
    return new Promise((resolve) => {
         firebase.firestore().collection('child-area-dashboard')
          .withConverter(childAreaConverter)
          .where('members', 'array-contains', this.userService.user.id)
          .get()
          .then((childAreasSnapshot: QuerySnapshot) => {
              let result: any[] = [];
              childAreasSnapshot.forEach(function(childSnapshot) {
                    // childData will be the actual contents of the child
                    result.push(childSnapshot.data());
                });
              resolve(result);
            }
          );
      });   
  }
 
  removeChildAreaOnServer(childAreaToRemove: ChildArea) {
    return new Promise (
      (resolve, reject) =>{
        firebase.firestore().collection('child-area-dashboard').doc(childAreaToRemove.id.toString()).delete().then(
          () => {
            console.log(childAreaToRemove.id);
            this.emitChildAreasManaged();
            resolve();            
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
    
   
  }
  removeChildArea(childAreaToRemove: ChildArea){
    this.removeChildAreaOnServer(childAreaToRemove).then(
      () =>{
        const childIndexToRemove = this.childAreasManaged.findIndex(
          (childAreaEl) => {
            if(childAreaEl === childAreaToRemove) {
              return true;
            }
          }
        );
        this.childAreasManaged.splice(childIndexToRemove, 1);
      }
    );    
  }
}
