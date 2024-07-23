import React from 'react';
import '@/app/globals.css';

const PostsSection: React.FC = () => {
  return (
    <section className="w-full mx-12">
      <h2 className="text-xl font-semibold ml-5 mb-6">내가 작성한 글</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <article key={index} className="p-4">
            <div className="w-full h-48 bg-gray-200 mb-4">
              <img className="w-full h-full object-cover" src="/path/to/image.jpg" alt={`Post ${index + 1}`} />
            </div>
            <h3 className="text-green-500 font-semibold mb-2 truncate">잡담</h3>
            <p className="text-gray-700 font-semibold mb-2 truncate">제목입니다. 최대 1줄까지 생각중이에요</p>
            <p className="text-gray-700 mb-2 truncate-lines-2">
              내용이에요. 최대 2줄까지 생각하고 있습니다. 공간 여백..
            </p>
            <time className="text-gray-400">24. 7. 14.</time>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostsSection;
