import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'square-icon',
  templateUrl: './square-icon.component.html',
  styleUrls: ['./square-icon.component.scss']
})
export class SquareIconComponent implements OnInit {

  /**
   * Size of the sqaure icon, in px
   */
  @Input() size: number = 40;
  
  /**
   * Color property of the icon
   */
  @Input() color: string = 'black';
  
  /**
   * Icon font package to use
   */
  @Input() iconPackage: string = 'simple-icon';
  
  /**
   * Mandatory: Icon to use, from font package literal
   */
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Computes the font size
   */
  public getFontSize(): number {
    if (this.iconPackage === 'simple-icon') {
      return this.size * 5/3;
    }
    return this.size * 4/3;
  }
  
  /**
   * Computes the line height
   */
  public getLineHeight(): number {
    if (this.iconPackage === 'simple-icon') {
      return this.size * 1/6;
    }
    return this.size * 1/2
  }

}
