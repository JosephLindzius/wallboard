export interface Photo {
  id?: string
  filepath: string;
  webviewPath: string;
  userId?: string;
  creationDate?: string;
  comment?: Comment[]
  likes?: string[]
  public?: boolean
}

export interface DogPicture {
  message: string;
  status: string;
}

export interface GeoCoords {
  latitude: string,
  longitude: string
}

export interface WeatherDisplay {
  time: string,
  temperature: number
  next_hour: NextHour
}

export interface NextHour {
  summary: {
    precipitation_amount: number,
    symbol_code: string
  },
  details: { symbol_code: string }
}

export interface CityLocation {
  city: string,
  countryCode: string
}

export interface Todo {
  id: string
  userId: string
  title: string
  desc: string
  date: string
  likes?: string[]
  public: boolean
  completed?: boolean
  comment?: Comment[]
  creationDate?: string
  userName?: string
}

export interface Comment {
  id: string
  userId: string
  todoId: string
  comment: string
  likes?: string[]
  userName?: string
}

export interface TodoUser {
  completed?: [];
  id?: string,
  name: string,
  todos: Todo[],
  userId: string
  email: string
}

export interface RegisterInfo {
  email: string,
  password: string,
  name?: string
}

export interface Scripts {
  name: string;
  src: string;
}

export interface TodoState {
  data: Todo[];
}

export interface Ingredients {
  ingredient: string[]
  amount: string[]
}

export interface Drink {
  dateModified: string
  idDrink: string
  strAlcoholic: string
  strCategory: string
  strCreativeCommonsConfirmed: string
  strDrink: string
  strDrinkAlternate: string
  strDrinkThumb: string
  strGlass: string
  strIBA: string
  strImageAttribution: string
  strImageSource: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strInstructions: string
  strInstructionsDE: string
  strInstructionsES: string
  strInstructionsFR: string
  strInstructionsIT: string
  "strInstructionsZH-HANS": string
  "strInstructionsZH-HANT": string
  strMeasure1: string
  strMeasure2: string
  strMeasure3: string
  strMeasure4: string
  strMeasure5: string
  strMeasure6: string
  strMeasure7: string
  strMeasure8: string
  strMeasure9: string
  strMeasure10: string
  strMeasure11: string
  strMeasure12: string
  strMeasure13: string
  strMeasure14: string
  strMeasure15: string
  strTags: string
  strVideo: string
}

