import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ChildArea } from '../models/child-area.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//
export class ChildAreaService {

  public childArea: ChildArea;
  
  public childAreaSubject = new Subject<ChildArea>();
  
  constructor() { }
  
  ngOnInit(){    
    
  }
  
  public refresh(id: string){
    // Open a connexion toward the new child area on SDB
    console.log('cestlid!!!!!' + id);
    firebase.firestore().collection('child-dashboard').doc(id).withConverter(childAreaConverter).onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
    },(childAreaSubject) => {        
      console.log('here');
      console.log(childAreaSubject.data())
      this.childArea = childAreaSubject.data();
      this.emitChildAreaSubject();
      console.log('child area service rfreshed !!!!!!!S')
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
      console.log('add role to: ' + childAreaId + ' for user ' + participantUserId);
      firebase.firestore().collection('child-dashboard').doc(childAreaId).update(
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
            birthList : childArea.birthList,
            admin : childArea.admin,
            members : childArea.members
            }
    },
    fromFirestore: function(snapshot : any, options : any){
        const data = snapshot.data(options);
        let childArea = new ChildArea(data.dueDate, data.name);
        childArea.id = data.id;
        childArea.birthList = data.birthList;
        childArea.firstNameProposals = data.firstNameProposals;
        childArea.admin = data.admin;
        childArea.members = data.members;
        return childArea;
        
    }
}