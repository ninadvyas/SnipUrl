import React, { useState } from 'react';
import ProfileModal from './ProfileModal';

const UserProfile = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="relative">
      <img
        src={user.user_metadata.avatar_url || 'https://via.placeholder.com/40'}
        alt="User Avatar"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={toggleDropdown}
      />
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <button onClick={openModal} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Profile
          </button>
          <button onClick={onLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
      {modalOpen && <ProfileModal user={user} onClose={closeModal} />}
    </div>
  );
};

export default UserProfile;
