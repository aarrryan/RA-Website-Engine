import React from 'react';
import { Header } from './Dashboard/Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00F0FF] selection:text-black">
      {/* Subtle Background Effects */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
             backgroundSize: '100px 100px' 
           }}>
      </div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#00F0FF]/[0.02] via-transparent to-transparent pointer-events-none"></div>

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
