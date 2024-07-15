import React from 'react';
import downloadsvg from '../assets/download.svg';


function Home() {
  return (
    <div className='flex flex-col items-center'>
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
      <div className='flex'>
      <img src={downloadsvg} alt="Download SVG" className=' h-[45rem] w-[60rem]' /> 
      </div>
    </div>
  );
}

export default Home;
