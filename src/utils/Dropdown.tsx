import React, { useState, useRef, useEffect } from 'react';
import ProfileTrigger from '@/components/Common/Header/ProfileTrigger';
import DropdownContent from '@/components/Common/Header/DropdownContent';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const clickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <ProfileTrigger onClick={toggleDropdown} />
      {isOpen && <DropdownContent />}
    </div>
  );
};

export default ProfileDropdown;
