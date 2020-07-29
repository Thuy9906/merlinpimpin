//User model : user account informations 
export class User {
  id : string = '';
  firstName : string = '';
  lastName : string = '';
  emailAdress : string = '';
  
  public isDefined(): boolean{
    return this.id !== '';
  }
}