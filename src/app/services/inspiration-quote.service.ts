import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, shareReplay, switchMap, take, tap} from "rxjs/operators";
import {Observable, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InspirationQuoteService {

  private QUOTE_URL = "https://quotes.rest/qod?language=en";
  private QUOTE_URL_2 = "https://api.icndb.com/jokes/random/5?limitTo=[nerdy]"
  private CACHE_SIZE: number = 1;
  private REFRESH_INTERVAL = 10000
  private cache$: Observable<string>;

  constructor(private http: HttpClient) { }

  get quotes() {
    return this.requestQuote()
    if (!this.cache$) {
     // const timer$ = timer(0, this.REFRESH_INTERVAL);

     // this.cache$ = timer$.pipe(
   //     switchMap(_ => this.requestQuote()),
    //    shareReplay(this.CACHE_SIZE)
  //    );
    }

    return this.cache$;
  }
  requestQuote(){
   // return this.http.get<any>(this.QUOTE_URL).pipe(map(data=>data.contents.quotes[0].quote));
      return this.http.get<any>(this.QUOTE_URL_2).pipe(
        take(1));
  }
}
