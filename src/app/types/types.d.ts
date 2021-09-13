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
  summary: { precipitation_amount: number },
  details: { symbol_code: string }
}

export interface CityLocation {
  city: string,
  countryCode: string
}
