import React from 'react';


const Footer = () => {
  return (
    <footer className=" text-black">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-center sm:text-left">
          <p>&copy;{new Date().getFullYear()} Snipp - Url Shortener.</p>
        </div>
        <div className="flex gap-2">
          <a href="https://www.linkedin.com/in/ninadvyas/" target='_blank' rel="noreferrer" className="inline-flex items-center justify-center  h-8 w-8 text-black  hover:text-blue-400 ">
            <img src="https://cdn-icons-png.freepik.com/256/123/123718.png?semt=ais_hybrid" alt="LinkedIn" className=" w-6 h-6 rounded-sm fill-current" />
          </a>
          <a href="https://twitter.com/ninadvsd" target='_blank' rel="noreferrer" className="inline-flex items-center justify-center h-8 w-8 hover:text-blue-400 ">
            <img src="https://cdn.iconscout.com/icon/free/png-512/free-twitter-9420781-7651211.png?f=webp&w=512" alt="Twitter" className="w-6 h-6 fill-current" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
