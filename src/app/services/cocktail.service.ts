import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DogPicture} from "../types/types";
import {map, tap} from "rxjs/operators";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";
import {getContentOfKeyLiteral} from "@ionic/angular-toolkit/schematics/util/ast-util";

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private sourceURL: string = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  constructor(private http: HttpClient) { }

  get cocktail(){
    return this.http.get<any>(this.sourceURL).pipe(map((cocktails)=>{
      return cocktails.drinks[0]
    }))
  }
}
