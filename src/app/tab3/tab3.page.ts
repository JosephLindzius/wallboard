import {Component, OnChanges, OnInit} from '@angular/core';
import {DogPictureService} from "../services/dog-picture.service";
import {Observable} from "rxjs";
import {CityLocation, DogPicture, GeoCoords, WeatherDisplay} from "../types/types";
import {WeatherReportService} from "../services/weather-report.service";
import {GeolocationLookupService} from "../services/geolocation-lookup.service";
import {CityLocatorService} from "../services/city-locator.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnChanges {

  public imageSource$!: Observable<string>;
  public weatherReport$!: Observable<WeatherDisplay>;
  public getCityLocation$!: Observable<CityLocation>;


  constructor(private dogPictureService: DogPictureService,
              private weatherReportService: WeatherReportService,
              private cityLocator: CityLocatorService,
              ) {}

  ngOnInit(){
     this.getCityLocation$ = this.cityLocator.getLocation().pipe(tap(console.log));
     this.imageSource$ = this.dogPictureService.getDogPicturePayload();
     this.weatherReport$ = this.weatherReportService.getWeatherReport();
  }

  ngOnChanges(){
    this.weatherReport$ = this.weatherReportService.getWeatherReport();
  }

}
