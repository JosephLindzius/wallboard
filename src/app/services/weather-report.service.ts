import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {debounce, delay, map, switchMap, take, tap} from "rxjs/operators";
import {GeoCoords, WeatherDisplay} from "../types/types";
import {Observable} from "rxjs";
import {GeolocationLookupService} from "./geolocation-lookup.service";





@Injectable({
  providedIn: 'root'
})

export class WeatherReportService {

  constructor(private http: HttpClient, private geolocationLookupService: GeolocationLookupService) {}

  private ROOT_WEATHER_API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact"

  getWeatherReport() {
      return this.geolocationLookupService.getLocation().pipe(
        map((data)=>{
          return {
            latitude: data.latitude,
            longitude: data.longitude
          }}),
        switchMap((data)=>this.callWeatherApi(data)),
      )

  }

  private callWeatherApi(data: GeoCoords){
    return this.http.get<any>(this.ROOT_WEATHER_API_URL + "?lat=" + data.latitude + "&lon=" + data.longitude).pipe(
      delay(500),
      map((data) => {
        return data.properties.timeseries.map((forecast) => {
          if (forecast.data.next_1_hours) {
            return {
              time: forecast.time,
              temperature: forecast.data.instant.details.air_temperature,
              next_hour: forecast.data.next_1_hour
            }
          }
          return {
              time: forecast.time,
              temperature: forecast.data.instant.details.air_temperature,
            }
        })
      })
    )
  }


}
