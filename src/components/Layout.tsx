import React from 'react';
import { Header } from './Dashboard/Header';
import { WeatherBackground } from './Dashboard/WeatherBackground';
import { usePuneWeather } from '../hooks/usePuneWeather';

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { weather } = usePuneWeather();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 selection:text-white">
      {/* Live Pune Weather Background */}
      {weather && (
        <WeatherBackground visual={weather.visual} />
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

      {/* Global Readability Overlay */}
      <div
        className="fixed inset-0 z-[7] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,5,5,0.02), rgba(0,0,0,0.12))',
        }}
      />

      {/* Application Content */}
      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-6 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}