import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  /**
   * Input user
   */
  @Input() user: User = null;

  constructor(
     public userService: UserService) { }

  ngOnInit(): void {
  }

}
