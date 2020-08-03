import { Component, OnInit, Input, Output } from '@angular/core';

import { EventEmitter } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'interactive-input',
  templateUrl: './interactive-input.component.html',
  styleUrls: ['./interactive-input.component.scss']
})
export class InteractiveInputComponent implements OnInit {

  /**
   * Placeholder input. Mandatory, shall be documented. Usually taken from modeld node value
   * Use alternative placehoder if not sure given value is set
   */
  @Input() placeholder: string;
  
  /**
   * Alterantive placeholder in case placeholder is null or empty.
   * Usually is a plain string that indicae what to do with this input
   */
  @Input() altPlaceholder: string;

  /**
   * Id of the input. Mandatory, shall be documented
   */
  @Input() inputId: string;
  
  /**
   * Label of the input, if any. May be undocumented for none
   */
  @Input() inputLabel: string = '';
  
  /**
   * Optional. Label width. If not set, automatically adapt to content
   */
  @Input() inputLabelWidth: string = 'inherit';

  /**
   * Target SDB Document Node for the property to be updated on server.
   * Can be let undocumented if update on server is not wanted
   */
  @Input() sdbDocNode: string = '';
  
  /**
   * Target SDB property to be updated on server, for the provided document node.
   * Can be let undocumented if update on server is not wanted
   */
  @Input() sdbProperty: string = '';

  /**
   * Output event for the component:
   * On blur input
   */
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  
  /**
   * Output event for the component:
   * On success (loading on SDB is done and it is a success)
   */
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();
  
  /**
   * Loading status notified via a stateful spinner during update on sdb
   */
  public sdbLoadingStatus = -1;

  constructor() { }

  ngOnInit(): void {
  }
  
  /**
   * Triggered blurring input. Shall emit the blur event of the component with the input content, 
   * if this content is not null nore empty
   */
  public onBlurInput(event: any){
    let inputValue: string = event.srcElement.value;
    
    // Emit blur event
    if(inputValue != null && inputValue != ""){
      this.onBlur.emit(inputValue);
    }
    
    if (inputValue != '') {
      // Update value on SDB at provided node, if any
      if (this.sdbDocNode !== '') {
        let that = this;
        that.sdbLoadingStatus = 0;
        
        setTimeout(() => {
          
          let sdbPropertyUpdate = {};
          sdbPropertyUpdate[this.sdbProperty] = inputValue;
          firebase.firestore().doc(this.sdbDocNode).update(sdbPropertyUpdate)
            .then(function() {
                // Continue and set miniature URL
                that.sdbLoadingStatus = 1;
                
                // Release status after the 3 second validation time span
                setTimeout(() => {
                  that.sdbLoadingStatus = -1;
                }, 3000);
              })
            .catch(function(error) {
                // If any, notify failure to user
                that.sdbLoadingStatus = 2;
                console.log(error);
              });

          }, 1000);
      }
    }
  }
  
  /**
   * Handles the click on the edit markup
   * Shall focus the text input
   */
  public onClickEditMarkup(id:string){
    document.getElementById(id).focus();
  }
  
  /**
   * Get placeholder to display
   */
  public getPlaceholder(): string {
    if (this.placeholder != null && this.placeholder !== '') {
      return this.placeholder;
    }
    return this.altPlaceholder;
  }

}
