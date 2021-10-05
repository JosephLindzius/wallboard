import {Component, OnChanges, OnInit} from '@angular/core';
import {DogPictureService} from "../services/dog-picture.service";
import {Observable} from "rxjs";
import {CityLocation, DogPicture, GeoCoords, WeatherDisplay} from "../types/types";
import {WeatherReportService} from "../services/weather-report.service";
import {CityLocatorService} from "../services/city-locator.service";
import {InspirationQuoteService} from "../services/inspiration-quote.service";
import {CocktailService} from "../services/cocktail.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnChanges {

  public imageSource$!: Observable<string>;
  public weatherReport$!: Observable<WeatherDisplay[]>;
  public getCityLocation$!: Observable<CityLocation>;
  public quote$: Observable<any>
  public cocktail$: Observable<any>

  constructor(
    private dogPictureService: DogPictureService,
    private weatherReportService: WeatherReportService,
    private cityLocator: CityLocatorService,
    private inspirationQuoteService: InspirationQuoteService,
    private cocktailService: CocktailService
  ) {}

  ngOnInit(){
     this.getCityLocation$ = this.cityLocator.getLocation();
     this.imageSource$ = this.dogPictureService.getDogPicturePayload();
     this.weatherReport$ = this.weatherReportService.getWeatherReport();
     this.quote$ = this.inspirationQuoteService.quotes;
     this.cocktail$ = this.cocktailService.cocktail;
  }

  ngOnChanges(){
    this.weatherReport$ = this.weatherReportService.getWeatherReport();
  }

}
