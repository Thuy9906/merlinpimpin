import { Donation } from './donation.model';

//Gift model
export class Gift {
  item : string = '';
  quantity : number = 1;
  brand : string = '';
  price : number = 0;
  //Quantity of items given by the follower
  donation : Donation[] = [];
  image : string = '';
  constructor(item : string, quantity : number) {
    this.item = item;
    this.quantity = quantity;
   }
}