import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InspirationQuoteService {

  private QUOTE_URL = "https://quotes.rest/qod?language=en";

  constructor(private http: HttpClient) { }

  getQuote(){
    return this.http.get<any>(this.QUOTE_URL).pipe(map(data=>data.contents.quotes[0].quote));
  }
}
