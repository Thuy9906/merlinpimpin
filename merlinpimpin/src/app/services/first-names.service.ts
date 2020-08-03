import { Injectable } from '@angular/core';
import { FirstNameProposal } from '../models/first-names/first-names.model';
import { ChildAreaService } from './child-area.service';
import { ChildArea } from '../models/child-area.model';

@Injectable({
  providedIn: 'root'
})
export class FirstNamesService {

  public firstNames : FirstNameProposal[] = [];
  constructor(public childAreaService: ChildAreaService) {
    this.childAreaService.childAreaSubject.subscribe(
      (childArea: ChildArea) => {
        this.firstNames = childArea.firstNameProposals;
        console.log(this.firstNames);
      }
    );
   }
   
   public addFirstNameOnServer(firstName : FirstNameProposal){
    console.log(firstName);
  }
}
export const firstNameConverter = {
    toFirestore: function(firstNameProposal : FirstNameProposal) {
        return {
            firstNameProposed: firstNameProposal.firstNameProposed,
            vote: firstNameProposal.vote
            }
    },
    fromFirestore: function(snapshot : any, options : any){
        const data = snapshot.data(options);
        let firstNameProposal = new FirstNameProposal(data.firstNameProposed);
        firstNameProposal.vote = data.vote;
        return firstNameProposal;
        
    }
    
}
