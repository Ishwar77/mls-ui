import { Component, Input, OnInit } from '@angular/core';
/**
 * <app-no-content [message]="'No Data to Display'"> </app-no-content>
 */

@Component({
  selector: 'app-no-content',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class NoContentComponent implements OnInit {

  _message = '';
  @Input()
  get message() {
    return this._message;
  }
  set message(m) {
    this._message = m;
  }

  constructor() { }

  ngOnInit() {
  }

}
