'use client';

import { useState } from 'react';
import { createClient } from '@/supabase/client';
import dayjs from 'dayjs';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import Button from '@/components/Common/Button';
import { Category } from '@/types/tags';
import ImageUpload, { FileInfo } from '../ImageUpload/ImageUpload';
import CategoryMain from '../Category/Categories';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/ui/alert-dialog';

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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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
      return;
    }
    setContentError(null);
    setContent(value);
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handlePostRegist = async () => {
    try {
      if (!user) {
        showAlertMessage('로그인이 필요합니다.');
        return;
      }

      if (title.length < 2) {
        showAlertMessage('제목은 최소 2자 이상이어야 합니다.');
        return;
      }

      if (content.length === 0 || content.length > 500) {
        showAlertMessage('내용은 1자 이상 500자 이하여야 합니다.');
        return;
      }

      if (!selectedCategory) {
        showAlertMessage('카테고리를 선택해주세요.');
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
      showAlertMessage('게시글 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto pb-[188px] px-4 s:px-0 s:pb-6">
      <h2 className="text-lg font-semibold mb-4">포스트 작성</h2>
      <div className="mb-6 s:mb-0">
        <CategoryMain
          categories={categories}
          selectedCategories={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        {categoryError && <div className="text-backgroundError mt-1 text-sm">{categoryError}</div>}
        <input
          type="text"
          placeholder="제목을 입력 해주세요. (최소 2자)"
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600 s:my-1"
          value={title}
          onChange={(e) => validateTitle(e.target.value)}
        />
        {titleError && <div className="text-backgroundError mt-1 text-sm">{titleError}</div>}
        <textarea
          placeholder="식단을 공유하거나, 자유롭게 이야기를 나눠보세요. (최대 500자)"
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600 mt-2 h-64 s:h-48"
          value={content}
          onChange={(e) => validateContent(e.target.value)}
        />
        <div className="flex mt-2">
          {contentError && <p className="text-backgroundError text-sm s:w-1/2">{contentError}</p>}
          <p className="ml-auto text-gray600 text-sm s:w-1/2 s:text-right">{content.length}/500</p>
        </div>
      </div>

      <ImageUpload fileInfos={fileInfos} setFileInfos={setFileInfos} setImageError={setImageError} />
      {imageError && <div className="text-backgroundError mt-1 text-sm">{imageError}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      <div className="mt-6">
        <div className="flex justify-center gap-4 s:flex-row s:flex s:justify-center s:space-y-0 s:space-x-4">
          <Button
            buttonName="취소"
            onClick={() => router.push('/posting-main')}
            bgColor="bg-white"
            boxShadow="none"
            textColor="text-gray900"
            paddingY="py-2"
            border="border-gray400"
            buttonWidth="w-48 s:w-full s:w-1/4 s:px-3 s:py-2 s:item-center s:h-10"
            hover="hover:bg-gray100 hover:border-gray600"
          />
          <Button
            buttonName="작성 완료"
            onClick={handlePostRegist}
            bgColor="bg-white"
            boxShadow="none"
            textColor="text-primary600"
            paddingY="py-2"
            border="border-primary500"
            buttonWidth="w-48 s:w-full s:px-3 s:py-2 s:item-center s:h-10"
          />
        </div>
      </div>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>알림!</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-[#F5637C]" onClick={() => setShowAlert(false)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TextareaPage;
