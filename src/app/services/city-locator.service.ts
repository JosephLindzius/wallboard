import { Injectable } from '@angular/core';
import {GeolocationLookupService} from "./geolocation-lookup.service";
import {GeoCoords} from "../types/types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CityLocatorService {

  constructor(private http: HttpClient, private geolocationLookupService: GeolocationLookupService) { }
      private CITY_DECODER_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

  getLocation() {
    return this.geolocationLookupService.getLocation().pipe(
      map((data)=>{
        return {
          latitude: data.latitude,
          longitude: data.longitude
        }}),
      switchMap((data)=>this.getCityName(data)),
    )

  }
     private getCityName(data: GeoCoords){
       const headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.get<any>(this.CITY_DECODER_URL+ "?latitude=" + data.latitude + "&longitude=" + data.longitude+"&localityLanguage=en", {headers}).pipe(
          map((data)=>{
            console.log(data);
            return {
              city: data.locality,
              countryCode: data.countryCode
            }
          })
        )
      }
}
