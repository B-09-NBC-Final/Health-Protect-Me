import React from 'react';
import Image from 'next/image';

const PostingDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);
  return (
    // 팀원들이랑 상의해서 main 공통으로 빼기
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-[1280px] py-[100px] px-80">
        <div className="py-5">
          {/* 디자인 나오면 공통 컴포넌트로 만들기 */}
          <strong className="bg-green-300 p-2">잡담</strong>
          <p className="text-bold mt-3">식단 추천 받아서 건강한 식생활 시작해보세요.</p>
          <Image src="" alt="" width={200} height={200} className="mt-3" />
          <p className="mt-3">요기서 맞춤형 추천 받은 식단을 꾸준히 먹으니 인생이 달라졌습니다.</p>
        </div>

        <div className="flex border-y-2 border-solid border-coral py-5">
          <Image src="" alt="" width={50} height={50} className="rounded-full" />
          <div className="flex flex-col ml-5">
            <strong>닉네임</strong>
            <span>24.7.18</span>
          </div>
        </div>
        <div className="mt-5 text-right">
          <button type="button" className="p-3 bg-gray-200">
            수정하기
          </button>
          <button type="button" className="p-3 bg-gray-200 ml-5">
            삭제하기
          </button>
        </div>
      </div>
    </main>
  );
};

export default PostingDetailPage;
