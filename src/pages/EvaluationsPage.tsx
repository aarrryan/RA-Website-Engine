import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';
import { evaluations } from '../data/evaluations';
import { FileText, Calendar, Target, Search } from 'lucide-react';

export function EvaluationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvals = evaluations.filter(e => 
    e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const continuousEvals = filteredEvals.filter(e => e.status === 'continuous');
  const scheduledEvals = filteredEvals.filter(e => e.status === 'scheduled');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1B1D21] pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-white">ACADEMIC EVALUATIONS</h1>
            <p className="text-sm text-gray-400 mt-1">Continuous Assessment & Examinations</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search subjects or types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-[#101114] border border-[#1B1D21] text-sm text-white px-9 py-2 rounded-lg focus:outline-none focus:border-[#00F0FF] transition-colors font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-bold text-gray-400 tracking-widest font-mono flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              SCHEDULED ASSESSMENTS
            </h2>
            
            <div className="bg-[#101114] border border-[#1B1D21] rounded-xl overflow-hidden divide-y divide-[#1B1D21]">
              {scheduledEvals.length > 0 ? scheduledEvals.map((evalItem, index) => (
                <motion.div 
                  key={evalItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 sm:p-6 hover:bg-[#151619] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">{evalItem.subject}</h3>
                      <div className="flex items-center mt-2 text-sm text-[#00F0FF]">
                        <Target className="w-4 h-4 mr-2" />
                        {evalItem.type}
                      </div>
                    </div>
                    <div className="bg-[#0B0B0D] px-3 py-2 rounded-md border border-[#1B1D21] text-right">
                      <div className="text-xs text-gray-500 font-mono mb-1">DATE</div>
                      <div className="text-sm font-mono text-white whitespace-nowrap">{evalItem.dateStr}</div>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="p-8 text-center text-gray-500 font-mono text-sm">
                  No scheduled assessments match your search.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-sm font-bold text-gray-400 tracking-widest font-mono flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              CONTINUOUS EVALUATION
            </h2>
            
            <div className="space-y-4">
              {continuousEvals.length > 0 ? continuousEvals.map((evalItem, index) => (
                <motion.div 
                  key={evalItem.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#101114] border border-[#1B1D21] rounded-xl p-4 hover:border-[#7000FF]/50 transition-colors"
                >
                  <h3 className="text-sm font-medium text-white mb-2">{evalItem.subject}</h3>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">{evalItem.type}</span>
                    <span className="text-[#7000FF] bg-[#7000FF]/10 px-2 py-1 rounded">{evalItem.dateStr}</span>
                  </div>
                </motion.div>
              )) : (
                <div className="p-8 bg-[#101114] border border-[#1B1D21] rounded-xl text-center text-gray-500 font-mono text-sm">
                  No continuous evaluations match.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
