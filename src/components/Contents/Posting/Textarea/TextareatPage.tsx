'use client';

import { useState } from 'react';
import { createClient } from '@/supabase/client';
import dayjs from 'dayjs';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/tags';
import ImageUpload from '../ImageUpload/ImageUpload';
import CategoryMain from '../Category/Categories';

type FileInfo = {
  url: string;
};



const supabase = createClient();

const TextareaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const categories: Category[] = [
    { id: '잡담', name: '잡담' },
    { id: '질문', name: '질문' },
    { id: '정보', name: '정보' }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    setCategoryError(null);
  };

  const validateTitle = (value: string) => {
    if (value.length < 2) {
      setTitleError('제목은 최소 2자 이상이어야 합니다.');
    } else {
      setTitleError(null);
    }
    setTitle(value);
  };

  const validateContent = (value: string) => {
    if (value.length > 500) {
      setContentError('내용은 최대 500자까지 입력 가능합니다.');
    } else {
      setContentError(null);
    }
    setContent(value);
  };

  const handlePostRegist = async () => {
    try {
      if (!user) {
        setError('로그인이 필요합니다.');
        return;
      }

      if (title.length < 2) {
        setTitleError('제목은 최소 2자 이상이어야 합니다.');
        return;
      }

      if (content.length > 500) {
        setContentError('내용은 최대 500자까지 입력 가능합니다.');
        return;
      }

      if (!selectedCategory) {
        setCategoryError('카테고리를 선택해주세요.');
        return;
      }

      if (fileInfos.length === 0) {
        setImageError('최소 1개의 이미지를 업로드해주세요.');
        return;
      }

      const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const imageUrls = fileInfos.map((info) => info.url);
      const { data: postData, error } = await supabase.from('posts').insert({
        user_id: user.userId,
        title,
        content,
        image_url: imageUrls,
        created_at: timestamp,
        category: selectedCategory
      });

      if (error) throw error;

      router.push('/posting-main');
    } catch (error) {
      setError('게시글 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6">게시글 작성</h1>
        <CategoryMain
          categories={categories}
          selectedCategories={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        {categoryError && <div className="text-red-500 mb-2">{categoryError}</div>}
        <div className="border-t border-gray-200 pt-8">
          <Input
            type="text"
            placeholder="제목을 입력 해주세요. (최소 2자)"
            className="w-full p-2 mb-4 border-b focus:outline-none transition-colors duration-300 placeholder-gray-400 text-black"
            value={title}
            onChange={(e) => validateTitle(e.target.value)}
          />
          {titleError && <div className="text-red-500 mb-2">{titleError}</div>}
          <Textarea
            placeholder="식단을 공유하거나, 자유롭게 이야기를 나눠보세요. (최대 500자)"
            id="content"
            className="mt-4 w-full h-64 p-4 rounded-lg focus:ring-2 outline-none transition-all duration-300 resize-none placeholder-gray-400 text-black"
            value={content}
            onChange={(e) => validateContent(e.target.value)}
          />
          {contentError && <div className="text-red-500 mt-2">{contentError}</div>}
        </div>
      </div>
      <ImageUpload
      fileInfos={fileInfos}
      setFileInfos={setFileInfos}
      setImageError={setImageError}
    />  
      {imageError && <div className="text-red-500 mt-2">{imageError}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-8 flex justify-center">
        <div className="space-x-4">
          <Button
            className="px-6 py-2 bg-[#FF848F] text-white rounded-lg hover:bg-[#FF7A85] transition duration-300"
            onClick={handlePostRegist}
          >
            등록하기
          </Button>
          <Button
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
            onClick={() => router.push('/posting-main')}
          >
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextareaPage;
