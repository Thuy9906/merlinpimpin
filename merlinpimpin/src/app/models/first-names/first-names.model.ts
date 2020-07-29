import { Vote } from './vote.model';

//Fisrt Name Proposal model
export class FirstNameProposal{
  proposal : string;
  //Majority Judgment : points accorded by follower
  vote : Vote[]= []; 
  totalPoints : number;
  constructor (proposal : string) {
    this.proposal = proposal;
  }
  computePoints() {};
  
}