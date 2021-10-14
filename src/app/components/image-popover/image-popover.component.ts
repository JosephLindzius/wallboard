import {Component, Input, OnInit} from '@angular/core';
import {Drink, Ingredients} from "../../types/types";

@Component({
  selector: 'wb-image-popover',
  templateUrl: './image-popover.component.html',
  styleUrls: ['./image-popover.component.scss'],
})
export class ImagePopoverComponent implements OnInit {

  imageSource!: string
  title!: string
  drink: Drink;
  ingredients: Ingredients
  ingredientLimit: number = 16;

  constructor() { }

  ngOnInit() {
    if(this.drink){
      let ingredients: Ingredients = {
        ingredient: [],
        amount: []
      }
      for(let i = 1; i < this.ingredientLimit; i++){
        let step = 'strIngredient'+i
        if(this.drink[step] !== null){
          ingredients.ingredient.push(this.drink[step])
        }
      }
      for(let i = 1; i < this.ingredientLimit; i++){
        let step = 'strMeasure'+i
        if(this.drink[step] !== null){
          ingredients.amount.push(this.drink[step])
        }
      }
      this.ingredients = ingredients
    }

  }

}
