import React, { useState } from 'react';
import {
  Cloud,
  CloudRain,
  FlaskConical,
  Moon,
  Sun,
  Zap,
  Wind,
  Radio,
} from 'lucide-react';

import { Header } from './Dashboard/Header';
import { WeatherBackground } from './Dashboard/WeatherBackground';
import { usePuneWeather } from '../hooks/usePuneWeather';
import type { WeatherVisual } from '../types/weather';

type WeatherMode =
  | 'AUTO'
  | 'SUNNY_DAY'
  | 'CLOUDY'
  | 'DRIZZLE'
  | 'RAINY'
  | 'THUNDERSTORM'
  | 'HAZY'
  | 'CLEAR_NIGHT';

interface WeatherOption {
  mode: WeatherMode;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

const WEATHER_OPTIONS: WeatherOption[] = [
  {
    mode: 'AUTO',
    label: 'Auto — Live Pune',
    shortLabel: 'AUTO',
    icon: <Radio className="w-4 h-4" />,
  },
  {
    mode: 'SUNNY_DAY',
    label: 'Sunny Day',
    shortLabel: 'SUN',
    icon: <Sun className="w-4 h-4" />,
  },
  {
    mode: 'CLOUDY',
    label: 'Cloudy',
    shortLabel: 'CLOUD',
    icon: <Cloud className="w-4 h-4" />,
  },
  {
    mode: 'DRIZZLE',
    label: 'Drizzle / Showers',
    shortLabel: 'DRIZZLE',
    icon: <CloudRain className="w-4 h-4" />,
  },
  {
    mode: 'RAINY',
    label: 'Heavy Rain',
    shortLabel: 'RAIN',
    icon: <CloudRain className="w-4 h-4" />,
  },
  {
    mode: 'THUNDERSTORM',
    label: 'Thunderstorm',
    shortLabel: 'STORM',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    mode: 'HAZY',
    label: 'Hazy',
    shortLabel: 'HAZE',
    icon: <Wind className="w-4 h-4" />,
  },
  {
    mode: 'CLEAR_NIGHT',
    label: 'Clear Night',
    shortLabel: 'NIGHT',
    icon: <Moon className="w-4 h-4" />,
  },
];

function WeatherTestControl({
  mode,
  onChange,
}: {
  mode: WeatherMode;
  onChange: (mode: WeatherMode) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const activeOption =
    WEATHER_OPTIONS.find(
      (option) => option.mode === mode
    ) ?? WEATHER_OPTIONS[0];

  return (
    <div
      className="fixed right-5 bottom-5 z-[30]"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div
        className={[
          'relative overflow-hidden',
          'border border-white/10',
          'bg-[#090909]/90',
          'backdrop-blur-xl',
          'shadow-2xl shadow-black/40',
          'transition-all duration-300 ease-out',
          expanded
            ? 'w-[245px] rounded-2xl'
            : 'w-[58px] rounded-full',
        ].join(' ')}
      >
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="w-[58px] h-[58px] flex items-center justify-center text-white/65 hover:text-white transition-colors"
            title="Weather test controls"
            aria-label="Open weather test controls"
          >
            <FlaskConical className="w-5 h-5" />
          </button>
        )}

        {expanded && (
          <div className="p-3">
            <div className="flex items-center justify-between px-2 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-white/70" />

                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/70">
                    Weather Test
                  </span>
                </div>

                <p className="mt-1 text-[9px] font-mono text-white/35">
                  DEVELOPMENT CONTROL
                </p>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-[10px] font-mono text-white/30 hover:text-white/70"
              >
                ×
              </button>
            </div>

            <div className="mb-3 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2">
              <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-white/30">
                ACTIVE MODE
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs text-white/75">
                {activeOption.icon}
                <span>{activeOption.label}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {WEATHER_OPTIONS.map((option) => {
                const active = option.mode === mode;

                return (
                  <button
                    key={option.mode}
                    type="button"
                    onClick={() => onChange(option.mode)}
                    className={[
                      'w-full flex items-center gap-3',
                      'rounded-xl px-3 py-2.5',
                      'border text-left',
                      'transition-all duration-200',
                      active
                        ? 'border-white/25 bg-white/[0.08] text-white'
                        : 'border-transparent bg-white/[0.02] text-white/45 hover:border-white/10 hover:bg-white/[0.05] hover:text-white/80',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex items-center justify-center',
                        'w-7 h-7 rounded-lg',
                        active
                          ? 'bg-white/10 text-white'
                          : 'bg-white/[0.035] text-white/40',
                      ].join(' ')}
                    >
                      {option.icon}
                    </span>

                    <span className="flex-1">
                      <span className="block text-[11px] font-medium">
                        {option.label}
                      </span>

                      <span className="block mt-0.5 text-[8px] font-mono uppercase tracking-[0.12em] opacity-40">
                        {option.shortLabel}
                      </span>
                    </span>

                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-white/8">
              <p className="text-[8px] leading-relaxed font-mono text-white/25">
                AUTO uses live Pune weather.
                Other modes are visual tests.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { weather } = usePuneWeather();

  const [weatherMode, setWeatherMode] =
    useState<WeatherMode>('AUTO');

  const activeVisual: WeatherVisual | null =
    weatherMode === 'AUTO'
      ? weather?.visual ?? null
      : weatherMode;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 selection:text-white">

      {/* Live / Test Weather */}
      {activeVisual && (
        <WeatherBackground visual={activeVisual} />
      )}

      {/* Technical Grid */}
      <div
        className="fixed inset-0 z-[6] opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Readability Overlay */}
      <div
        className="fixed inset-0 z-[7] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,5,5,0.02), rgba(0,0,0,0.12))',
        }}
      />

      {/* Application */}
      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-6 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {children}
          </div>
        </main>
      </div>

      {/* Development Weather Tester */}
      <WeatherTestControl
        mode={weatherMode}
        onChange={setWeatherMode}
      />
    </div>
  );
}