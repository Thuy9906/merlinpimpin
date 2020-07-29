import { User } from '../user.model';
//Points given by the follower for the first name proposal
export class Vote{
  pointsByFollower : number;
  voter : User;
}