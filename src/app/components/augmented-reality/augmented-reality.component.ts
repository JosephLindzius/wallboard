import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GeolocationService} from "@ng-web-apis/geolocation";
import {Observable} from "rxjs";
import {delay, take, tap} from "rxjs/operators";
import {ScriptLoaderService} from "../../services/script-loader.service";
import {Location} from "@angular/common";


@Component({
  selector: 'wb-augmented-reality',
  templateUrl: './augmented-reality.component.html',
  styleUrls: ['./augmented-reality.component.scss'],
})
export class AugmentedRealityComponent implements OnInit {

  loaded: boolean = false;

  geoLocation$: Observable<GeolocationPosition>
  constructor(private router: Router, private readonly gl: GeolocationService, private sl: ScriptLoaderService, private location: Location) { }

  ngOnInit() {
    this.sl.load('aframe', 'aframe-ar').then(()=>this.loaded=true);
    this.geoLocation$ = this.gl.pipe(take(1),tap(console.log), delay(10000));

  }

  goToLogin(){
    this.router.navigate([''])
  }
}
