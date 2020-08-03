import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'neumorphic-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  /**
   * Button literal icon
   */
  @Input() icon: string = '';
  
  /**
   * Button literal icon style
   * May be 'simple-icon' or 'modern-icon'
   * Simple icon by default
   */
  @Input() iconPackage: string = 'simple-icon';
  
  /**
   * Label of the icon, if any
   * Can be let undocumented if none
   */
  @Input() label: string = '';
  
  /**
   * Default size of the icon button, in px
   * 50 by default
   */
  @Input() size: number = 50;

  /**
   * Lable position, if any
   * May be 'right' of 'bottom'
   * Bottom by default
   */
  @Input() labelPosition: string = 'bottom';


  constructor() { }

  ngOnInit(): void {
  }
}
