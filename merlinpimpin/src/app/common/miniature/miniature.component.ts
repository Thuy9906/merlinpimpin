import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'miniature',
  templateUrl: './miniature.component.html',
  styleUrls: ['./miniature.component.scss']
})
export class MiniatureComponent implements OnInit {

  /**
   * URL of the minaiture photo.
   * Shall be provided
   */
  @Input() photoUrl: string = '';
  
  /**
   * Label of the miniature
   * Shall be provided
   */
  @Input() label: string = '';
  
  /**
   * Sublabel, if wanted. Can be let undocuented if none
   */
  @Input() subLabel: string = '';
  
  /**
   * Browse link, if any
   * Can be let undocumented if none
   */
  @Input() link: string = '';
  
  /**
   * Miniature width, in px
   * 180 by default
   */
  @Input() width: number = 180;
  
  /**
   * Miniature width, in px
   * 50 by default
   */
  @Input() height: number = 50;
  
  /**
   * Miniature border radius, in px
   * 10 by default
   */
  @Input() borderRadius: number = 10;
  
  /**
   * Miniature margin, in px
   * 10 by default
   */
  @Input() margin: number = 10;
  
  /**
   * Tells if miniature is clickable or not
   * true by default
   */
  @Input() clickable: boolean = true;
  
  /**
   * Style of the miniature
   * Can be: transparent; neumorphic; outline
   * Transparent by default
   */
  @Input() miniatureStyle = 'transparent'

  constructor() { }

  ngOnInit(): void {
  }

}
