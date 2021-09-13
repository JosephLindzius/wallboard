import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DogPicture} from "../types/types";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DogPictureService {

  private sourceURL: string = 'https://dog.ceo/api/breeds/image/random';

  constructor(private http: HttpClient) { }

  getDogPicturePayload(){
    return this.http.get<DogPicture>(this.sourceURL).pipe(map(payload=>payload.message))
  }
}
