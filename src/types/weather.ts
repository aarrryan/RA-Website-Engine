export type WeatherVisual =
  | 'SUNNY_DAY'
  | 'CLOUDY'
  | 'DRIZZLE'
  | 'RAINY'
  | 'THUNDERSTORM'
  | 'HAZY'
  | 'CLEAR_NIGHT';

export interface PuneWeather {
  temperature: number;
  weatherCode: number;
  precipitation: number;
  rain: number;
  showers: number;
  cloudCover: number;
  isDay: boolean;
  visual: WeatherVisual;
  description: string;
  location: string;
  updatedAt: Date;
}