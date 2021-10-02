import {Component, OnInit} from '@angular/core';
import {Platform} from "@ionic/angular";


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  tabsPlacement: string = 'top';
  tabsLayout: string = 'icon-top';
  desktop: boolean = false

  constructor(
    private platform: Platform,
  ) {}

  ngOnInit (){
    if (this.platform.is('desktop')) {
      this.desktop = true;
    }

  }
}
