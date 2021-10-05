import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() name: string
  @Input() backButton: boolean

  constructor() { }

  ngOnInit() {
  }

}
