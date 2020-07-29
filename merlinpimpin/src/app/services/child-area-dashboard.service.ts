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
  public isLoaded = false;
  private childAreas: ChildArea[] = [];
  public childAreasSubject = new Subject<ChildArea[]>();

  constructor(private childAreaService: ChildAreaService, private userService : UserService) {
    
    this.userService.userSubject.subscribe(
      () => {
        if(this.userService.user.isDefined()){
          this.refreshChildAreas();
        }
      }
    )
    this.userService.emitUser()
  }
  
  emitChildAreas() {
    this.childAreasSubject.next(this.childAreas);
  }
  
  
  createChildArea(newChildArea: ChildArea) {
    this.createChildAreaOnServer(newChildArea).then(
      () =>{
        this.childAreas.push(newChildArea);
      }
    );
  }
  
  
  /*
    @param childArea
    @return Promise
  */
  private  createChildAreaOnServer(newChildArea: ChildArea) {
    return new Promise (
      (resolve, reject) =>{
      firebase.firestore().collection('child-dashboard').doc(newChildArea.id).withConverter(childAreaConverter).set(newChildArea).then(
        () => {          
//        Set current user's permission as admin
          this.childAreaService.addAdmin(this.userService.user.id, newChildArea.id);
          this.emitChildAreas;
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
   
  refreshChildAreas(){
    this.isLoaded = false;
    this.childAreas = [];
    let isComplete: boolean  = false;
    
    // Retrieve child areas managed
    this.getChildAreasManaged().then((result: ChildArea[]) => {
        result.forEach(element=>{
            this.childAreas.push(element)
          });
          
        // If loading is complete, emit subject
        if (isComplete) {
          this.emitChildAreas();
          this.isLoaded = true;
        }
        
        // Set isComplete
        isComplete = true;
      });
      
    // Retrieve child areas followed
    this.getChildAreasFollowed().then((result: ChildArea[]) => {
        result.forEach(element=>{
            this.childAreas.push(element)
          });
          
        // If loading is complete, emit subject
        if (isComplete) {
          this.emitChildAreas();
          this.isLoaded = true;
        }
        
        // Set isComplete
        isComplete = true;
      });
  }
  
  /**
   * Retrieve child areas managed on database
   */
  
  private getChildAreasManaged(): Promise<ChildArea[]> {
    return new Promise((resolve) => {
         firebase.firestore().collection('child-dashboard')
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
    console.log("REQUEST");
    console.log(this.userService.user.id);
    return new Promise((resolve) => {
         firebase.firestore().collection('child-dashboard')
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
 
  
  /*getSingleChildArea(id: number) {
    return new Promise ((resolve) => {
      firebase.firestore().collection('child-dashboard').doc(id.toString()).get().then((childAreaSnapshot: DocumentSnapshot) => {
        if (childAreaSnapshot.exists) {
            console.log("Document data:", childAreaSnapshot.data());
            resolve(childAreaSnapshot);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    });    
  }
 

  removeChildAreaOnServer(childAreaToRemove: ChildArea) {
    return new Promise (
      (resolve, reject) =>{
        firebase.firestore().collection('child-dashboard').doc(childAreaToRemove.id.toString()).delete().then(
          () => {
            console.log(childAreaToRemove.id);
            this.emitChildAreas();
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
        const childIndexToRemove = this.childAreas.findIndex(
          (childAreaEl) => {
            if(childAreaEl === childAreaToRemove) {
              return true;
            }
          }
        );
        this.childAreas.splice(childIndexToRemove, 1);
      }
    );    
  }*/
}


  
  /*private getChildAreasOnServer(): Promise<ChildArea[]> {
    return new Promise((resolve) => {
         firebase.database().ref('/child-dashboard').on('value', (childAreaSnapshot: DataSnapshot) => {
              let result: ChildArea[] = [];
              childAreaSnapshot.forEach(function(childSnapshot) {
                    // childData will be the actual contents of the child
                    result.push(childSnapshot.val());
                });
              resolve(result);
            }
          );
      });
  }*/
  
  /*return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/child-dashboard/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );*/