'use client';

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/logo.png" alt="logo" className="w-12 h-12" />
        <button className="px-4 py-2 bg-green-600 rounded">로그인</button>
      </div>
    </header>
  );
};

export default Header;
