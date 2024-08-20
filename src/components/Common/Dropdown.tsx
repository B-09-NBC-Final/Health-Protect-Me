import React, { useState, useRef, useEffect } from 'react';
import ProfileTrigger from '@/components/Common/Header/ProfileTrigger';
import DropdownContent from '@/components/Common/Header/DropdownContent';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const clickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <ProfileTrigger setIsOpen={setIsOpen} />
      {isOpen && <DropdownContent closeDropdown={closeDropdown} />}
    </div>
  );
};

export default ProfileDropdown;
