import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import logo from '../assets/urls.png';
import { PersonIcon, ExitIcon } from '@radix-ui/react-icons';
import ProfileModal from './ProfileModal';

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
    };
    getSession();
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error('Error logging in with Google:', error.message);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    setUser(null);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openModal = () => {
    setModalOpen(true);
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex items-center h-16 bg-transparent px-12">
      <div className="flex items-center mr-auto">
        <a href="/" rel="logo">
          <img src={logo} alt="Logo" className="h-10 bg-black p-1.5 rounded-md" />
        </a>
      </div>

      <div className="flex items-right ml-auto">
        {user ? (
          <div className="relative">
            <img
              src={user.user_metadata.avatar_url || 'https://via.placeholder.com/40'}
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={openModal}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <PersonIcon className="mr-2" /> Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <ExitIcon className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="text-sm md:text-base text-white duration-300 border bg-black rounded-lg px-4 py-2"
          >
            Login
          </button>
        )}
      </div>

      {modalOpen && <ProfileModal user={user} onClose={closeModal} />}
    </div>
  );
}

export default Navbar;
