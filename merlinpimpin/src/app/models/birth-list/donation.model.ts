import { User } from '../user.model';

//Quantity of items given by the follower
export class Donation {
  giver : User;
  quantity : number;
}