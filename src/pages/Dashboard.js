import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UrlForm from '../components/UrlForm';
import ShortenedUrl from '../components/ShortenedUrl';
import UrlCard from '../components/UrlCard';
import { supabase } from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Dashboard({ user, onLogout }) {
  const [shortUrl, setShortUrl] = useState('');
  const [urls, setUrls] = useState([]);

  const fetchUrls = useCallback(async () => {
    if (user?.id) {
      const { data, error } = await supabase
        .from('urls')
        .select('short_code, long_url, hit_count, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching URLs:', error.message);
      } else {
        setUrls(data);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      fetchUrls();
    }
  }, [user, fetchUrls]);

  const handleSubmit = async (longUrl) => {
    try {
      const response = await axios.post('https://snipurl.vercel.app/api/shorten', { longUrl, userId: user?.id });
      setShortUrl(response.data.shortUrl);
      fetchUrls();
      toast.success('URL created successfully');
    } catch (error) {
      console.error('Error shortening URL', error);
      toast.error('Failed to create URL');
    }
  };

  const handleDelete = (shortCode) => {
    setUrls((prevUrls) => prevUrls.filter((url) => url.short_code !== shortCode));
    toast.success('URL deleted successfully');
  };

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className="mx-auto  max-w-full">
        <Toaster />
        <UrlForm onSubmit={handleSubmit} />
        {shortUrl && <ShortenedUrl shortUrl={shortUrl} />}
        <div className="w-full flex flex-col items-center mt-4">
        <AnimatePresence>
            {urls.map((url) => (
              <motion.div
                key={url.short_code}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                layout
              >
                <UrlCard key={url.short_code} url={url} onDelete={handleDelete} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;