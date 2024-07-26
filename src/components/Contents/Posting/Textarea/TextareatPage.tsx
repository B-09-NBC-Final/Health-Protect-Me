'use client';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import CategoryMain from '../Category/Categories';
import dayjs from 'dayjs';
import { Category } from '@/types/tags';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const supabase = createClient();

interface FileInfo {
  file: File;
  preview: string;
  url: string;
}

const TextareaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const categories: Category[] = [
    { id: '1', name: '잡담' },
    { id: '2', name: '질문' },
    { id: '3', name: '후기' }
  ];

  useEffect(() => {
    return () => fileInfos.forEach((info) => URL.revokeObjectURL(info.preview));
  }, [fileInfos]);

  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      for (const file of fileArray) {
        await addImgFile(file);
      }
    }
  };

  const addImgFile = async (file: File) => {
    try {
      const newFileName = uuidv4();
      const { data, error } = await supabase.storage.from('images').upload(`${newFileName}`, file);
      if (error) {
        throw error;
      }
      const response = supabase.storage.from('images').getPublicUrl(data.path);
      const publicUrl = response.data.publicUrl;

      setFileInfos((prev) => [
        ...prev,
        {
          file,
          preview: URL.createObjectURL(file),
          url: publicUrl
        }
      ]);
    } catch (error) {
      setError('이미지 업로드 중 문제가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  const handleRemovePrevFile = (index: number) => {
    setFileInfos((prev) => {
      const newFileInfos = [...prev];
      URL.revokeObjectURL(newFileInfos[index].preview);
      newFileInfos.splice(index, 1);
      return newFileInfos;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

  const handlePostRegist = async () => {
    try {
      const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const { data: postData, error } = await supabase.from('posts').insert({
        user_id: id,
        title,
        content,
        image_url: fileInfos.map((info) => info.url).join(','),
        created_at: timestamp,
        category: selectedCategory.
      });

      if (error) throw error;
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
        <div className="border-t border-gray-200 pt-8">
          <Input
            type="text"
            placeholder="제목을 입력 해주세요."
            className="w-full p-2 mb-4 border-b border-transparent focus:border-[#FF7A85] focus:outline-none transition-colors duration-300 placeholder-gray-400 text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="내용을 적어주세요."
            id="content"
            className="mt-4 w-full h-64 p-4 border-transparent rounded-lg focus:ring-2 focus:ring-[#FF7A85] focus:border-[#FF7A85] outline-none transition-all duration-300 resize-none placeholder-gray-400 text-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-wrap gap-4 mb-4">
          {fileInfos.map((info, index) => (
            <div key={index} className="relative">
              <div className="relative w-[120px] h-[120px]">
                <Image
                  src={info.preview}
                  alt={`preview-${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <button
                  className="absolute -top-2 -right-2 bg-[#FF7A85] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => handleRemovePrevFile(index)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        <label className="flex items-center cursor-pointer">
          <Image src="/add_image_icon.png" alt="addImg" width={30} height={30} className="mr-2" />
          <span className="text-sm text-blue-500">이미지 추가</span>
          <input type="file" id="test" multiple accept="image/*" className="hidden" onChange={handleUploadFiles} />
        </label>
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-8">
        <div className="flex justify-end space-x-4">
          <Button
            className="px-6 py-2 bg-[#FF848F] text-white rounded-lg hover:bg-[#FF7A85] transition duration-300"
            onClick={handlePostRegist}
          >
            등록하기
          </Button>
          <Link href="/">
            <Button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300">
              취소하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TextareaPage;
