import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { announcements } from '../data/announcements';
import { Bell, Calendar, Clock, AlertTriangle } from 'lucide-react';

export function AnnouncementsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-[#1B1D21] pb-6">
          <h1 className="text-2xl font-bold tracking-wider text-white">ANNOUNCEMENTS</h1>
          <p className="text-sm text-gray-400 mt-1">Important updates and deadlines</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-[#101114] border rounded-xl p-6 transition-all ${
                announcement.priority === 'high' ? 'border-[#00F0FF]/50' : 'border-[#1B1D21]'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {announcement.priority === 'high' && (
                      <AlertTriangle className="w-4 h-4 text-[#00F0FF]" />
                    )}
                    <span className="text-xs font-mono px-2 py-1 bg-[#151619] border border-[#1B1D21] rounded text-[#00F0FF]">
                      {announcement.category}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      {announcement.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {announcement.title}
                  </h3>
                  <div className="text-sm text-gray-300 mb-2">
                    {announcement.subject}
                  </div>
                  <p className="text-sm text-gray-400 font-mono">
                    {announcement.description}
                  </p>
                </div>
                
                {announcement.deadline && (
                  <div className="shrink-0 bg-[#0B0B0D] px-4 py-3 rounded-lg border border-[#1B1D21] text-right">
                    <div className="text-[10px] font-mono text-gray-500 mb-1 flex items-center justify-end">
                      <Clock className="w-3 h-3 mr-1" />
                      DEADLINE
                    </div>
                    <div className="text-sm font-mono text-white">
                      {announcement.deadline}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {announcements.length === 0 && (
            <div className="text-center text-gray-500 font-mono text-sm py-12">
              No active announcements at this time.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
