import React from 'react';

const ProfileSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          <img className="w-full h-full rounded-full" src="/path/to/profile-image.jpg" alt="Profile" />
        </div>
        <h1 className="text-xl font-bold mt-5">물에빠진오리님</h1>
        <button className="w-[88px] h-[28px] bg-gray-200 text-gray-500 text-xs rounded mt-2">프로필 수정</button>
      </div>
      <div className="w-full flex justify-center my-8">
        <hr className="border-t border-gray-300 w-80" />
      </div>
      <section className="w-[320PX] h-[184px] mx-auto p-5 rounded-xl text-center bg-white border border-gray-300">
        <div className="w-[224px] bg-green-50 p-2 rounded-3xl mb-2 mx-auto">
          <h2 className="text-green-600 font-bold">체중 감량</h2>
        </div>
        <p className="text-gray-500 mb-4 text-sm">헬프미와 함께 목표를 달성</p>
        <div className="flex justify-between items-center p-4 rounded-lg">
          <div className="flex flex-col items-center">
            <span>키</span>
            <span>179.5cm</span>
          </div>
          <div className="h-12 w-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <span>체중</span>
            <span>139.9kg</span>
          </div>
          <div className="h-12 w-px bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <span>BMI</span>
            <span>비만</span>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProfileSection;
