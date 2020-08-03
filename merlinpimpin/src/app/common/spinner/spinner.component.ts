import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() size: number = 20; // Size of the spinner, in px
  @Input() color: string = "tomato"; // Spinner color;
  @Input() loadingStatus: number = 0; // 0: isLoading, 1:Success, 2: Failure
  
  constructor() { }

  ngOnInit(): void {
  }
  
  public getBorderSize() {
    return this.size / 7;
  }

}
