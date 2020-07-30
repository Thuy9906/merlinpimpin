//User model : user account informations 
export class User {
  id : string = '';
  firstName : string = '';
  lastName : string = '';
  pseudo: string = '';
  emailAdress : string = '';
  
    /**
   * URL of the user's avatar
   */
  public avatarUrl: string ="";
  
    /**
   * URL of the user's photo
   */
  public photoUrl: string = "";
  
  public isDefined(): boolean{
    return this.id !== '';
  }
}