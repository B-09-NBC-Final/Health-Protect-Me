'use client'
import React, { useState } from 'react';

const PostingMainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  //임시 더미 데이터
  const lunchItems = [
    {
      image: 'image1.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User1',
      date: '24.7.12'
    },
    {
      image: 'image2.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User2',
      date: '24.7.12'
    },
    {
      image: 'image3.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User3',
      date: '24.7.12'
    },
    {
      image: 'image4.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User4',
      date: '24.7.12'
    },
    {
      image: 'image5.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User5',
      date: '24.7.12'
    },
    {
      image: 'image5.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User6',
      date: '24.7.12'
    },
    {
      image: 'image5.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User7',
      date: '24.7.12'
    },
    {
      image: 'image5.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User8',
      date: '24.7.12'
    },
    {
      image: 'image5.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User9',
      date: '24.7.12'
    },
    {
      image: 'image5.jpg',
      title: '오늘 제 점심입니다!',
      description: '점심이라고 팍씨',
      nickname: 'User10',
      date: '24.7.12'
    }
  ];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = lunchItems.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center place-items-center h-screen">
      <div className="items-center">
        <div className="flex space-x-4">
          <button>전체</button>
          <button>잡담</button>
          <button>질문</button>
          <button>후기</button>
        </div>
        <div>
          {currentPosts.map((item, index) => (
            <div key={index} className="flex flex-col border-b pb-4 mb-4">
              <div className="flex">
                <p className="">이미지 들어감</p>
                <div className="items-center">
                  <h2 className="font-bold mb-2">{item.title}</h2>
                  <p className="mb-2">{item.description}</p>
                  <div className="flex justify-between">
                    <p>{item.nickname}</p>
                    <p>{item.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className={`px-3 py-1`}
            onClick={() => paginate(currentPage - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: Math.ceil(lunchItems.length / postsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1 ${currentPage === pageNumber ? 'text-black font-bold' : ''}`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className={`px-3 py-1`}
            onClick={() => paginate(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostingMainPage;