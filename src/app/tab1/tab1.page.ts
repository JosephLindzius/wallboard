import {Component, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from "@ionic/angular";
import {InspirationQuoteService} from "../services/inspiration-quote.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public quote!: Observable<string>;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private inspirationalQuote: InspirationQuoteService) { }

  ngOnInit (){
    this.quote = this.inspirationalQuote.getQuote();
    console.log(this.quote.subscribe(console.log))
  }

  doReorder(ev: CustomEvent) {
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

}
