import { User } from './user.model';

export enum Permission {
  ADMIN, FOLLOWER
}

//Role model for child area management
export class Role{  
  participantUserId : string = "";
  permission : Permission = Permission.FOLLOWER;
  constructor(participant : string, permission : Permission) {
    this.participantUserId = participant;
    this.permission = permission;
  }
}