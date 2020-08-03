import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService, UserConverter } from 'src/app/services/user.service';
import * as firebase from 'firebase';

/**
 * User picker is a UI/behavior component that enables to select user among a list of users
 */
@Component({
  selector: 'user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.scss']
})
export class UserPickerComponent implements OnInit {

  /**
   * Width of the string picker container
   * If not set, will behave like a normal div within the container
   */
  @Input() containerWidth: string = '';
  
  /**
   * Height of the user miniatures of the user picker, in px
   */
  @Input() userSize: number = 40;
  
  /**
   * List of initially selected users
   */
  @Input() initialSelectedUsers: User[] = [];
  
  /**
   * List of users which cannot be selected
   */
  @Input() excludedUsers: User[] = [];
  
  /**
   * Max number of result for a user search
   */
  @Input() searchMaxNumber: number = 5;
  
  /**
   * SDB firestore collection identified where user documents are stored
   * default value is 'user'
   */
  @Input() sdbUserCollection: string = 'user';
  
  /**
   * Target SDB Document Node for the property to be updated on server
   * Can be let undocumented if update on server is not wanted
   */
  @Input() sdbDocNode: string = '';
  
  /**
   * Target SDB property to be updated on server, for the provided document node.
   * Property shall point toward a user array.
   * Can be let undocumented if update on server is not wanted
   */
  @Input() sdbProperty: string = '';
  
  /**
   * Event that is raised when a user is clicked
   * User that is clicked is carried by the event
   */
  @Output() clickUser: EventEmitter<User> = new EventEmitter<User>();
  
  /**
   * Event that is raised when user selection is changed
   * List of all selected users is carried by this event at any trigger
   */
  @Output() selectUsers: EventEmitter<User[]> = new EventEmitter<User[]>();
  
  /**
   * Event that is raised when a user is selected
   * Selected user is carried by this event
   */
  @Output() selectUser: EventEmitter<User> = new EventEmitter<User>();
  
  /**
   * Event that is raised when a user is unselected
   * Unselected item is carried by this event
   */
  @Output() unselectUser: EventEmitter<User> = new EventEmitter<User>();
  
  /**
   * Bindable selected users
   */
  public selectedUsers: User[] = [];
  
  /**
   * Bindable proposed users
   */
  public proposedUsers: User[] = [];
  
  /**
   * Tells if a user search is runnning
   */
  public isSearching: boolean = false;
  
  /**
   * Gives user that are submitted to a loading operation
   * Only used if user-picker is linked to a SDB node for upload/download operations
   */
  public userLoading: User[] = [];
  
  /**
   * Last user search input value
   */
  public lastSearch: string = '';
  
  
  /**
   * Tells if the component UI is flipped or not
   * Initially unflipped
   */
  public isFlipped = false;

  constructor(
      private userService: UserService) { }

  ngOnInit(): void {
    // Set selected users
    this.selectedUsers = [...this.initialSelectedUsers];
    
    // Launch search
    this.search('');
    
  }
  
  public onClickUser(user: User){
    // Emit the clickUser event
    this.clickUser.emit(user);
    
    // Switch user status: if selected, unselect it; if not select it
    this.switchUserStatus(user);
    
    // Emit the selctItems event
    this.selectUsers.emit(this.selectedUsers);
  }
  
  /**
   * Switch selected status of a user
   */
  private switchUserStatus(user: User){
    // Tells user is loading
    this.userLoading.push(user);

    // If item is selected, unselect it
    if (this. selectedUsers.includes(user)){
      this.removeUserOnServer(user)
        .then(() => {
          // Tell it is not loading anymore
          const index = this.userLoading.indexOf(user);
          this.userLoading.splice(index, 1);
          
          // Remove of list of selected user
          const index2 = this.selectedUsers.indexOf(user);
          this.selectedUsers.splice(index2, 1);
          
          // Relaunch search
          this.search(this.lastSearch);
          
        }).catch(() => {
          // Tell it is not loading anymore
          const index = this.userLoading.indexOf(user);
          this.userLoading.splice(index, 1);
        });
      
      // Emit unselect item event
      this.unselectUser.emit(user);
    }
    
    // Else if item is not, select it
    else {
      console.log('Selected users before:')
      console.log(this.selectedUsers);
      this.addUserOnServer(user)
        .then(() => {
          // Tell it is not loading anymore
          const index = this.userLoading.indexOf(user);
          this.userLoading.splice(index, 1);
          
          // Add to list of selected user
          this.selectedUsers.push(user);
          
          
          
          // Flip view
          this.isFlipped = false;
          
          // Relaunch search
          this.search(this.lastSearch);
          
          console.log('Selected users after:')
          console.log(this.selectedUsers);
          
        }).catch(() => {
          // Tell it is not loading anymore
          const index = this.userLoading.indexOf(user);
          this.userLoading.splice(index, 1);
        });
      
      // Emit select item event
      this.selectUser.emit(user);
    }
  }
  
  /**
   * Search among all SDB users and update component accordingly
   */
  public search(inputValue: string) {
    this.isSearching = true;
    this.searchUsersOnServer(this.searchMaxNumber, inputValue, this.selectedUsers.concat(this.excludedUsers))
      .then((result: User[]) => {
          this.proposedUsers = result;
          this.isSearching = false;
          this.lastSearch = inputValue;
        });
  }
  
  /**
   * Adds a user within the selected server document
   * Promise is resolved if update of the recipe went well, rejected if not
   */
  public addUserOnServer(user: User) {
    // Create property update
    let sdbPropertyUpdate = {};
    sdbPropertyUpdate[this.sdbProperty] = firebase.firestore.FieldValue.arrayUnion(user.id);
    
    // Update on server
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().doc(this.sdbDocNode).update(sdbPropertyUpdate).
          then(function() {
              resolve(user);
          })
          .catch(function(error) {
              reject(error);
          });
      });
  }
  
  /**
   * Removes a user within the selected server document
   * Promise is resolved if update of the recipe went well, rejected if not
   */
  public removeUserOnServer(user: User) {
    // Create property update
    let sdbPropertyUpdate = {};
    sdbPropertyUpdate[this.sdbProperty] = firebase.firestore.FieldValue.arrayRemove(user.id);
    
    // Update on server
    return new Promise<any>((resolve, reject) => {
        firebase.firestore().doc(this.sdbDocNode).update(sdbPropertyUpdate).
          then(function() {
              resolve(user);
          })
          .catch(function(error) {
              reject(error);
          });
      });
  }
  
  /**
   * Search users from any string value in database
   */
  public searchUsersOnServer(maxNumber: number, value: string, excludedUsers: User[]): Promise<User[]>{
    const that = this;
    return new Promise((resolve) => {
      let result: User[] = [];
      firebase.firestore().collection(this.sdbUserCollection).limit(maxNumber + excludedUsers.length)
        .where('pseudo', '>=', value)
        .where('pseudo', '<=', value + 'z')
        .withConverter(UserConverter).get()
        .then(function(querySnapshot) {
            // Find all query result
            querySnapshot.forEach(function(doc) {
                result.push(doc.data())
              });
              
            // Remove excluded user form list
            for (let excludedUser of excludedUsers) {
              for (let resultItem of result) {
                if(excludedUser.id === resultItem.id) {
                  const index = result.indexOf(resultItem);
                  result.splice(index, 1);
                }
              }
            }
            
            // Limit to max number
            result = result.slice(0, maxNumber);
            
            // Return result
            resolve(result);
        })
        .catch(function(error) {
            console.log("Error getting users", error);
        });
      });
  }

}
