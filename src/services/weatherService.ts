import type { PuneWeather, WeatherVisual } from '../types/weather';

const PUNE_LATITUDE = 18.5204;
const PUNE_LONGITUDE = 73.8567;

const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${PUNE_LATITUDE}` +
  `&longitude=${PUNE_LONGITUDE}` +
  `&current=temperature_2m,precipitation,rain,showers,weather_code,cloud_cover,is_day` +
  `&timezone=Asia%2FKolkata`;

interface OpenMeteoResponse {
  current?: {
    temperature_2m: number;
    precipitation: number;
    rain: number;
    showers: number;
    weather_code: number;
    cloud_cover: number;
    is_day: number;
  };
}

function getVisual(
  weatherCode: number,
  cloudCover: number,
  isDay: boolean
): WeatherVisual {
  /*
   * WMO WEATHER CODES
   *
   * 0       Clear sky
   * 1       Mainly clear
   * 2       Partly cloudy
   * 3       Overcast
   * 45/48   Fog
   * 51-57   Drizzle
   * 61-67   Rain
   * 80-82   Rain showers
   * 95-99   Thunderstorm
   */

  // ----------------------------------------------------------
  // THUNDERSTORM
  // ----------------------------------------------------------

  if (weatherCode >= 95 && weatherCode <= 99) {
    return 'THUNDERSTORM';
  }

  // ----------------------------------------------------------
  // DRIZZLE / LIGHT SHOWERS
  // ----------------------------------------------------------

  if (
    (weatherCode >= 51 && weatherCode <= 57) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return 'DRIZZLE';
  }

  // ----------------------------------------------------------
  // HEAVIER CONTINUOUS RAIN
  // ----------------------------------------------------------

  if (weatherCode >= 61 && weatherCode <= 67) {
    return 'RAINY';
  }

  // ----------------------------------------------------------
  // FOG / HAZE
  // ----------------------------------------------------------

  if (weatherCode === 45 || weatherCode === 48) {
    return 'HAZY';
  }

  // ----------------------------------------------------------
  // NIGHT
  // ----------------------------------------------------------

  if (!isDay) {
    if (
      weatherCode === 0 ||
      weatherCode === 1
    ) {
      return 'CLEAR_NIGHT';
    }

    return 'CLOUDY';
  }

  // ----------------------------------------------------------
  // CLOUDY
  // ----------------------------------------------------------

  if (
    weatherCode === 2 ||
    weatherCode === 3 ||
    cloudCover >= 65
  ) {
    return 'CLOUDY';
  }

  // ----------------------------------------------------------
  // CLEAR DAY
  // ----------------------------------------------------------

  return 'SUNNY_DAY';
}

function getDescription(
  weatherCode: number,
  visual: WeatherVisual
): string {
  switch (visual) {
    case 'THUNDERSTORM':
      return 'Thunderstorm';

    case 'DRIZZLE':
      if (weatherCode >= 80 && weatherCode <= 82) {
        return 'Rain showers';
      }

      return 'Drizzle';

    case 'RAINY':
      return 'Rain';

    case 'HAZY':
      return 'Hazy';

    case 'CLEAR_NIGHT':
      return 'Clear night';

    case 'CLOUDY':
      return 'Cloudy';

    case 'SUNNY_DAY':
      return 'Clear sky';

    default:
      return 'Unknown';
  }
}

export async function fetchPuneWeather(): Promise<PuneWeather> {
  const controller = new AbortController();

  const timeout = window.setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(WEATHER_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Weather API failed with HTTP ${response.status}`
      );
    }

    const data =
      (await response.json()) as OpenMeteoResponse;

    if (!data.current) {
      throw new Error(
        'Weather API returned no current weather data.'
      );
    }

    const current = data.current;

    const isDay = current.is_day === 1;

    const visual = getVisual(
      current.weather_code,
      current.cloud_cover,
      isDay
    );

    return {
      temperature: current.temperature_2m,
      weatherCode: current.weather_code,
      precipitation: current.precipitation,
      rain: current.rain,
      showers: current.showers,
      cloudCover: current.cloud_cover,
      isDay,
      visual,
      description: getDescription(
        current.weather_code,
        visual
      ),
      location: 'Pune, Maharashtra',
      updatedAt: new Date(),
    };
  } finally {
    window.clearTimeout(timeout);
  }
}