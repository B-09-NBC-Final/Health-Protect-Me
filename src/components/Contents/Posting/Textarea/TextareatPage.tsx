import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const TextareaPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">커뮤니티 글 작성</h1>
        <Textarea
          placeholder="당신의 이야기를 적어주세요."
          id="message-2"
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <p className="mt-2 text-sm text-gray-500">많은 사람들이 당신의 글을 볼 수 있어요.</p>
      </div>
      <div className="flex justify-end space-x-4">
        <Button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
          등록하기
        </Button>
        <Button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300">
          취소하기
        </Button>
      </div>
    </div>
  );
};

export default TextareaPage;
