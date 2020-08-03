import { Vote } from './vote.model';

//Fisrt Name Proposal model
export class FirstNameProposal{
  firstNameProposed : string = "";
  //Majority Judgment : points accorded by follower
  vote : Vote[]= []; 
  constructor (proposal : string) {
    this.firstNameProposed = proposal;
  }
  computePoints() {};
  
}