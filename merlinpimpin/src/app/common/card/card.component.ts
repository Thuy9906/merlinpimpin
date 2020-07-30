import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'card',
  host: {
      'class': 'medium'
    },
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  // Size of the card, can be large, medium, small
  @Input() size: string;
 
  /**
   * Tells if card is loading
   */
  @Input() isLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
