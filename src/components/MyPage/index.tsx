import React from 'react';

const MyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black flex items-start justify-center p-8">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gray-400" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">물에빠진오리님</h1>
              <button className="bg-gray-200 text-gray-400 px-4 py-2 rounded mt-2">프로필 수정</button>
            </div>
          </div>
        </div>
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">체중 감량</h2>
            <div className="bg-green-100 p-4 rounded-lg mb-4">
              <p className="text-green-500 font-bold">헬프미와 함께 목표를 달성</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>키</span>
                <span>179.5cm</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>체중</span>
                <span>139.9kg</span>
              </div>
              <div className="flex justify-between">
                <span>BMI</span>
                <span>비만</span>
              </div>
            </div>
          </section>
          <section className="col-span-2">
            <h2 className="text-xl font-semibold mb-4">내가 작성한 글</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-green-500 font-semibold mb-2">잡담</h3>
                <p className="text-gray-700">제목입니다. 최대 1줄까지 생각중이에요</p>
                <p className="text-gray-500">내용이에요. 최대 2줄까지 생각하고 있습니다. 공간 여백..</p>
                <p className="text-gray-400 mt-2">24. 7. 14.</p>
              </div>
              <div>
                <h3 className="text-green-500 font-semibold mb-2">잡담</h3>
                <p className="text-gray-700">제목입니다. 최대 1줄까지 생각중이에요</p>
                <p className="text-gray-500">내용이에요. 최대 2줄까지 생각하고 있습니다. 공간 여백..</p>
                <p className="text-gray-400 mt-2">24. 7. 14.</p>
              </div>
              <div>
                <h3 className="text-green-500 font-semibold mb-2">잡담</h3>
                <p className="text-gray-700">제목입니다. 최대 1줄까지 생각중이에요</p>
                <p className="text-gray-500">내용이에요. 최대 2줄까지 생각하고 있습니다. 공간 여백..</p>
                <p className="text-gray-400 mt-2">24. 7. 14.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MyPage;
