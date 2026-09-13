import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'motion/react';
import { Database } from 'lucide-react';

export function ResourcesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="border-b border-[#1B1D21] pb-6">
          <h1 className="text-2xl font-bold tracking-wider text-white">RESOURCES</h1>
          <p className="text-sm text-gray-400 mt-1">Academic materials and references</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#101114] border border-[#1B1D21] rounded-xl p-12 flex flex-col items-center justify-center text-center"
        >
          <Database className="w-12 h-12 text-[#00F0FF] mb-4 opacity-50" />
          <h2 className="text-xl font-medium text-white mb-2">RESOURCES COMING SOON</h2>
          <p className="text-gray-400 font-mono text-sm max-w-md">
            The resource repository is currently being provisioned. Connected Google Drive modules will appear here once authenticated.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
