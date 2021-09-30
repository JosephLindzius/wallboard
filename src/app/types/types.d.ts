export interface Photo {
  filepath: string;
  webviewPath: string;
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
  id: string;
  userId: string;
  title: string;
  desc: string;
  date: string;
  likes?: number;
  public: boolean
}

export interface TodoUser {
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
