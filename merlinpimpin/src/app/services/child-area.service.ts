import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ChildArea } from '../models/child-area.model';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

//
export class ChildAreaService {

  public childArea: ChildArea;
  
  /** 
   * Resolved members of the currently loaded child area
   * Whenever child area is modified or refreshed, list of members is also refreshed accordingly
   */
  public resolvedMembers: User[] = [];
  
  public admin : User = new User();
  
  public areMembersLoaded: boolean = false;
  
  public isAdminLoaded: boolean = false;
  
  public childAreaSubject = new Subject<ChildArea>();
  
  constructor(private userService : UserService) { }
  
  ngOnInit(){    
    
  }
  
  private resolveAdmin(){
    this.userService.getUserByIdOnServer(this.childArea.admin).then(
      (result : User) => {
        this.admin = result;
        this.isAdminLoaded = true;
      }
    )
  }
  
  public refresh(id: string){
    // Open a connexion toward the new child area on SDB
    firebase.firestore().collection('child-area-dashboard').doc(id).withConverter(childAreaConverter).onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    },(childAreaSubject) => {        
      this.childArea = childAreaSubject.data();
      console.log(this.childArea);
      this.refreshMembers();    
      this.resolveAdmin();
      this.emitChildAreaSubject();
    });
  }
  
  public refreshMembers(){
    
    // Reset resolved members
    this.resolvedMembers = [];    
    // In case there is no members to resolve, tell that members are loaded
    if(this.childArea.members.length === 0){
      this.areMembersLoaded = true;
    }
    
    // Resolve each member of the newly refreshed child area
    this.childArea.members.forEach(element=>{
      this.userService.getUserByIdOnServer(element).then(
          (result : User) => {
            this.resolvedMembers.push(result);
            
            // Identify when all memebrs are first resolved
            if(this.childArea.members.length === this.resolvedMembers.length){
              this.areMembersLoaded = true;
            }
          });
        });
    
  }
  
  public isLoaded(): boolean {
    return this.childArea != null;
  }
  
  private emitChildAreaSubject(){
    this.childAreaSubject.next(this.childArea);
  }
  
  
  public addAdmin(participantUserId : string, childAreaId : string) {
     return new Promise (
      (resolve, reject) =>{
      firebase.firestore().collection('child-area-dashboard').doc(childAreaId).update(
          {
             "admin": participantUserId            
             //'birthList' : firebase.firestore.FieldValue.arrayUnion(giftConverter.toFirestore(gift))
          }).then(
        () => {
            this.emitChildAreaSubject();
            resolve()
        },(error) => {
            reject(error);
        });
      }
    );
  }

  /*public addMember(participantUserId : string, childAreaId : string) {
     return new Promise (
      (resolve, reject) =>{
      console.log('add role to: ' + childAreaId + ' for user ' + participantUserId);
      firebase.firestore().collection('child-dashboard').doc(childAreaId).update(
          {
             'members': firebase.firestore.FieldValue.arrayUnion(participantUserId)             
             //'birthList' : firebase.firestore.FieldValue.arrayUnion(giftConverter.toFirestore(gift))
          }).then(
        () => {
            this.emitChildAreaSubject();
            resolve()
        },(error) => {
            reject(error);
        });
      }
    );
  }*/

}

// Firestore data child area converter
export const childAreaConverter = {
    toFirestore: function(childArea : ChildArea) {
        return {
            id: childArea.id,
            name: childArea.name,
            dueDate: childArea.dueDate,
            firstNameProposals : childArea.firstNameProposals,
            babyRegistry : childArea.babyRegistry,
            admin : childArea.admin,
            members : childArea.members
            }
    },
    fromFirestore: function(snapshot : any, options : any){
        const data = snapshot.data(options);
        let childArea = new ChildArea(data.dueDate, data.name);
        childArea.id = data.id;
        childArea.babyRegistry = data.babyRegistry;
        childArea.firstNameProposals = data.firstNameProposals;
        childArea.admin = data.admin;
        childArea.members = data.members;
        return childArea;
        
    }
}