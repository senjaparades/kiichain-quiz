'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const CreatePage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-5xl font-extrabold text-yellow-300 drop-shadow-lg"
      >
        SOON KIIPER !!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl text-white/80"
      >
        The quiz creation feature is not yet available. Stay tuned!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-xl transition"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default CreatePage;
