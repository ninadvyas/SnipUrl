import React, { useState, useEffect } from 'react';
import { ClipboardIcon, TrashIcon, GlobeIcon, CheckIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import moment from 'moment';
import { motion } from 'framer-motion';

const UrlCard = ({ url, onDelete }) => {
  const { short_code, long_url, hit_count, created_at } = url;
  const [iconLoaded, setIconLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const hostname = new URL(long_url).hostname;
  const [iconUrl, setIconUrl] = useState(`https://logo.clearbit.com/${hostname}`);

  const shortenedUrl = `snipp.one/${short_code}`;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIconLoaded(true);
    img.onerror = () => {
      setIconLoaded(false);
      setIconUrl('');
    };
    img.src = iconUrl;
  }, [iconUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://snipp.one/${short_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://snipp.one/api/urls/${short_code}`);
      onDelete(short_code);
    } catch (error) {
      console.error('Error deleting URL', error);
    }
  };

  const timeAgo = moment(created_at).fromNow();
  const exactTime = moment(created_at).format('MMMM Do YYYY, h:mm a');

  return (
    <motion.div
      className="bg-white border border-gray-100 hover:border-gray-400 rounded-lg shadow-sm p-4 mb-3 w-[30rem] mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-2">
        <div className="flex">
          {iconLoaded ? (
            <img
              src={iconUrl}
              alt="website logo"
              className="w-12 h-12 mr-4 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 mr-4 bg-gray-200 animate-pulse rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-2xl font-bold">
                {hostname[0].toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold">{shortenedUrl}</h3>
            <p className="text-gray-600 text-[12px] break-words">{hostname}</p>
            <p className="text-gray-400 text-[10px]">Created:{exactTime}</p>
          </div>
          <button onClick={handleCopy} className="flex text-gray-500 h-6 scale-75 p-2 items-center bg-transparent">
            {copied ? (
              <span className="text-green-500"><CheckIcon /></span>
            ) : (
              <ClipboardIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className='ml-auto'>
          <div className="flex text-gray-500 h-6 text-sm p-2 gap-1  items-center bg-transparent">
            <GlobeIcon className="w-3" />
            <p className="text-gray-500">{hit_count}</p>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 px-2 py-1 ml-auto justify-end rounded-md border border-gray-200 flex items-center"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UrlCard;