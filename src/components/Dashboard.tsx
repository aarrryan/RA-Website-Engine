import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Greeting } from './Dashboard/Greeting';
import { LiveStatus } from './Dashboard/LiveStatus';
import { DivisionCards } from './Dashboard/DivisionCards';
import { WhatsNew } from './Dashboard/WhatsNew';
import { QuickAccess } from './Dashboard/QuickAccess';
import { GlobalSearch } from './Dashboard/GlobalSearch';
import { Layout } from './Layout';

export function Dashboard() {
  const { student } = useAuth();
  
  if (!student) return null;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <GlobalSearch />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Greeting />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <LiveStatus />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <DivisionCards />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2">
          <WhatsNew />
        </div>
        <div className="lg:col-span-1">
          <QuickAccess />
        </div>
      </motion.div>
    </Layout>
  );
}
