import { Injectable } from '@angular/core';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {map, take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class GeolocationLookupService {

  constructor(private readonly geolocation$: GeolocationService) { }

    getLocation(){
    return this.geolocation$.pipe(
      take(1),
      map((data)=>{
        return {
          latitude: data.coords.latitude.toFixed(4),
          longitude: data.coords.longitude.toFixed(4)
        }
    }))
    }
}
