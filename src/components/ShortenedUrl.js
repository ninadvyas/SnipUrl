import React from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ShortenedUrl = ({ shortUrl }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Copied to clipboard');
  };

  return (
    <AnimatePresence>
      <motion.div className="p-4 flex bg-white shadow-md border border-gray-100 gap-5 justify-start flex-row rounded-lg mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        layout>
        <p className=" mb-2 text-md flex flex-col">Recently Shortened URL:
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
        </p>
        <button
          onClick={copyToClipboard}
          className="bg-gray-50 shadow-md transition ease-in-out delay-150 ml-auto text-black p-2 m-w-auto h-10 rounded-md hover:bg-gray-100"
        >
          Click To Copy
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShortenedUrl;
