import { useEffect, useState } from 'react';
import type { PuneWeather } from '../types/weather';
import { fetchPuneWeather } from '../services/weatherService';

// Refresh live Pune weather every 5 minutes
const REFRESH_INTERVAL = 5 * 60 * 1000;

export function usePuneWeather() {
  const [weather, setWeather] = useState<PuneWeather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadWeather = async () => {
      try {
        const result = await fetchPuneWeather();

        if (!mounted) return;

        setWeather(result);

        console.log(
          `[RA WEATHER] ${result.location} | ${result.description} | ${result.temperature}°C | ${result.isDay ? 'DAY' : 'NIGHT'} | ${result.visual}`
        );
      } catch (error) {
        console.error(
          '[RA WEATHER] Unable to load Pune weather:',
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Fetch immediately when the application loads
    loadWeather();

    // Refresh every 5 minutes
    const interval = window.setInterval(
      loadWeather,
      REFRESH_INTERVAL
    );

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return {
    weather,
    loading,
  };
}