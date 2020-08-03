import { FirstNameProposal } from './first-names/first-names.model';
import { Gift } from './baby-registry/gift.model';


//Child area model
export class ChildArea {
  id: string = "";
  name: string = "";
  dueDate: Date;
  
  
  //User id of child area admin
  admin : string = "";
  
  //List of firstnames proposed by child area admin
  firstNameProposals: FirstNameProposal[] = [];
    
  //Birthlist with items proposed by child area admin
  babyRegistry: Gift[] = [];
  
  //Members connected to child area referenced by id
  members: string[] = [];
  
  constructor(dueDate : Date, name: string) {
    this.id = Date.now().toString();
    this.dueDate = dueDate;
    this.name = name;
  }
}