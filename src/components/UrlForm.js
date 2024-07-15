import React, { useState } from 'react';
import { ArrowRightIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';

const UrlForm = ({ onSubmit }) => {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(longUrl);
  };

  return (
    <AnimatePresence>
    <motion.div className="flex justify-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.25 }}
    layout>
      <form onSubmit={handleSubmit} className="mt-16 gap-2 flex rounded-lg w-[30rem]">
        <div className="relative flex items-center w-full">
          <input
            type="url"
            placeholder="Enter Url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="border border-slate-400 p-3 w-full text-black rounded-md pl-10 bg-white"
            required
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ExternalLinkIcon className="text-gray-500 w-6 h-6" />
          </div>
        </div>
        <button type="submit" className="flex items-center justify-center bg-black text-white p-2 rounded-md w-12 h-12">
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </form>
    </motion.div>
    </AnimatePresence>
  );
};

export default UrlForm;
