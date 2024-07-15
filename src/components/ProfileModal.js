import React, { useState, useEffect } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import axios from 'axios';

const ProfileModal = ({ user, onClose }) => {
  const [username] = useState(user.user_metadata.full_name || '');
  const [avatarUrl] = useState(user.user_metadata.avatar_url || '');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://shorturl-seu8.onrender.com/api/user/${user.id}`);
      const data = response.data;
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 flex flex-col items-center">
        <div className="flex justify-between w-full font-extrabold">
          <span>Profile</span>
          <button onClick={onClose} className="text-black">
            <Cross1Icon />
          </button>
        </div>
        <div className="mb-4 flex flex-col items-center">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="mt-4 h-32 w-32 rounded-full object-cover"
            />
          )}
          <div className="mt-4">
            <label className="block text-center text-black font-semibold">{username}</label>
            <label className="block text-center text-gray-600 text-sm">
              {user.email}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
