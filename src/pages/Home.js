import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UrlForm from '../components/UrlForm';
import ShortenedUrl from '../components/ShortenedUrl';
import downloadsvg from '../assets/download.svg';

function Home() {
  const [shortUrls, setShortUrls] = useState([]);
  const [limitReached, setLimitReached] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortUrls')) || [];
    const cooldownEnd = localStorage.getItem('cooldownEnd');

    if (cooldownEnd && new Date() < new Date(cooldownEnd)) {
      setCooldownActive(true);
      const timeRemaining = new Date(cooldownEnd) - new Date();
      setTimeout(() => {
        resetLimit();
      }, timeRemaining);
    } else {
      setShortUrls(savedUrls);
      setLimitReached(savedUrls.length >= 3);
    }
  }, []);

  const handleSubmit = async (longUrl) => {
    if (cooldownActive) {
      toast.error('You have reached the limit. Please wait for the cooldown period to end.');
      return;
    }

    if (shortUrls.length >= 3) {
      toast.error('Login to use more SnipURLs');
      startCooldown();
      return;
    }

    try {
      const response = await axios.post('https://shorturl-seu8.onrender.com/api/shorten', { longUrl, userId: null });
      const newShortUrl = response.data.shortUrl;
      const updatedUrls = [...shortUrls, newShortUrl];
      setShortUrls(updatedUrls);
      localStorage.setItem('shortUrls', JSON.stringify(updatedUrls));
      setLimitReached(updatedUrls.length >= 3);
      toast.success('URL created successfully');
    } catch (error) {
      console.error('Error shortening URL', error);
      toast.error('Failed to create URL');
    }
  };

  const startCooldown = () => {
    setCooldownActive(true);
    const cooldownEnd = new Date(new Date().getTime() + 10 * 60 * 1000);
    localStorage.setItem('cooldownEnd', cooldownEnd);
    setTimeout(() => {
      resetLimit();
    }, 10 * 60 * 1000);
  };

  const resetLimit = () => {
    setShortUrls([]);
    setLimitReached(false);
    setCooldownActive(false);
    localStorage.removeItem('shortUrls');
    localStorage.removeItem('cooldownEnd');
    toast.success('Cooldown ended. You can now shorten 3 more URLs.');
  };

  return (
    <div className='flex flex-col items-center'>
      <Toaster />
      <div className='pt-2'>
        <div className="relative rounded-full px-3 py-1 w-44 text-sm leading-6 text-gray-700 ring-1 ring-sky-500 hover:ring-sky-600">
          Free Url{' '}
          <a href="https://github.com/ninadvyas/Url-Frontend" target='_blank' rel="noreferrer" className="font-semibold text-green-400 p-1">
            <span aria-hidden="true" className="absolute inset-0" />
            Shortener <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <h1 className="text-4xl mt-2 font-bold tracking-tight text-gray-900 sm:text-6xl">
          Quick Links for a Fast-Paced World.
        </h1>
      </div>
      <UrlForm onSubmit={handleSubmit} />
      {shortUrls.map((shortUrl, index) => (
        <ShortenedUrl key={index} shortUrl={shortUrl} />
      ))}
      {limitReached && (
        <p className="text-red-500 mt-4">You have reached the limit of 3 shortened URLs.</p>
      )}
      {cooldownActive && (
        <p className="text-blue-500 mt-4">Cooldown active. Please wait for 10 minutes</p>
      )}
      <div className='flex'>
        <img src={downloadsvg} alt="Download SVG" className='h-[45rem] w-[60rem]' />
      </div>
    </div>
  );
}

export default Home;
