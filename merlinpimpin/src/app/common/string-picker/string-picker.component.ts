import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Component to help selection of one or multiple elements among a list of strings
 */
@Component({
  selector: 'string-picker',
  templateUrl: './string-picker.component.html',
  styleUrls: ['./string-picker.component.scss']
})
export class StringPickerComponent implements OnInit {

  /**
   * Width of the string picker container
   * If not set will behave like a normal div
   */
  @Input() containerWidth: string = '';

  /**
   * List of all items among which to select
   * Mandatory, empty by default
   */
  @Input() items: string[] = [];
  
  /**
   * Font size, in px
   * 10 by default
   */
  @Input() fontSize: number = 10;
  
  /**
   * Tells if only one string can be selected
   * False by default
   */
  @Input() singleSelection: boolean = false;
  
  /**
   * List of initially selected items
   */
  @Input() initialSelectedItems: string[] = [];
  
  /**
   * Event that is raised when an item is clicked
   * String that is clicked is carried by the event
   */
  @Output() clickItem: EventEmitter<string> = new EventEmitter<string>();
  
  /**
   * Event that is raised when selection is changed
   * List of all selected items is carried by this event
   */
  @Output() selectItems: EventEmitter<string[]> = new EventEmitter<string[]>();
  
  /**
   * Event that is raised when an item is selected
   * Selected item is carried by this event
   */
  @Output() selectItem: EventEmitter<string> = new EventEmitter<string>();
  
  /**
   * Event that is raised when an item is unselected
   * Unselected item is carried by this event
   */
  @Output() unselectItem: EventEmitter<string> = new EventEmitter<string>();
  
  /**
   * Bindable selected items
   */
  public selectedItems: string [] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.initialSelectedItems);
    
    // Set selected items
    this.selectedItems = this.initialSelectedItems;
  }
  
  public onClickItem(item: string){
    // Emit the clickItem event
    this.clickItem.emit(item);
    
    // Switch item status: if selected, unselect it; if not select it
    this.switchItemStatus(item);
    
    // Emit the selctItems event
    this.selectItems.emit(this.selectedItems);
  }
  
  /**
   * Switch selected status of an item
   */
  private switchItemStatus(item: string){
    // If only one selection is allowed, empty selected array
    if (this.singleSelection){
      this.selectedItems = [];
    }
    
    // If item is selected, unselect it
    if (this. selectedItems.includes(item)){
      const index = this.selectedItems.indexOf(item);
      this.selectedItems.splice(index, 1);
      
      // Emit unselect item event
      this.unselectItem.emit(item);
    }
    
    // Else if item is not, select it
    else {
      this.selectedItems.push(item);
      
      // Emit select item event
      this.selectItem.emit(item);
    }
  }

}
