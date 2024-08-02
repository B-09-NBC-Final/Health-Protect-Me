'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/supabase/client';
import { Post } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import iconCamera from '@/assets/icons/icon_camera.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PostingUpdateForm = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [contentError, setContentError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string[]>([]);
  const [uploadFile, setUploadFile] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getPost = async () => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) {
      console.log('error', error);
      return;
    } else {
      setTitle(data?.title as string);
      setContent(data?.content as string);
      setFileUrl(data?.image_url);

      if (typeof data?.image_url === 'string') {
        setPreviews([data.image_url]);
      } else if (Array.isArray(data?.image_url)) {
        setPreviews(data.image_url);
      }
    }
  };

  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      setUploadFile((precFiles) => [...precFiles, ...fileArray]);

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews((prevpreviews) => [...prevpreviews, ...newPreviews]);

      for (const file of fileArray) {
        await addImgFile(file);
      }
    }
  };

  const addImgFile = async (file: File) => {
    try {
      const newFileName = uuid();
      const { data, error } = await supabase.storage.from('images').upload(`${newFileName}`, file);
      if (error) {
        console.error(error);
        return;
      }
      const response = supabase.storage.from('images').getPublicUrl(data.path);
      const publicUrl = response.data.publicUrl;

      setFileUrl((url) => [...url, publicUrl]);
      console.log(fileUrl);
    } catch (error) {
      console.error('문제가 발생했습니다. 다시 시도 해주세요..!');
    }
  };

  const handleRemovePrevFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((preview) => preview.filter((_, i) => i !== index));
    setUploadFile((prevFile) => prevFile.filter((_, i) => i !== index));
    setFileUrl((prevurl) => prevurl.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      if (title.length < 2) {
        setTitleError('제목은 최소 2자 이상이어야 합니다.');
        return;
      }

      if (content.length > 500) {
        setContentError('내용은 최대 500자까지 입력 가능합니다.');
        return;
      }

      if (fileUrl.length === 0) {
        setImageError('최소 1개의 이미지를 업로드해주세요.');
        return;
      }

      const checkConfirm = confirm('등록 하시겠습니까?');
      if (checkConfirm) {
        await supabase
          .from('posts')
          .update({
            title,
            content,
            image_url: fileUrl
          })
          .eq('id', id)
          .select('*');
        alert('등록 되었습니다.');
        router.push(`/posting-detail/${id}`);
      } else {
        alert('취소되었습니다.');
      }
    } catch (error) {
      setError('게시글 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  const validateTitle = (value: string) => {
    if (value.length < 2) {
      setTitleError('최소 2자 이상이어야 합니다.');
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

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="w-[800px] mx-auto">
      <h2 className="text-lg font-semibold mb-4">포스트 수정</h2>
      <div className="border-t border-gray-200 pt-8">
        <Input
          type="text"
          placeholder="제목을 입력 해주세요."
          className="w-full p-2 mb-4 border-b border-transparent focus:border-[#FF7A85] focus:outline-none transition-colors duration-300 placeholder-gray-400 text-black"
          value={title}
          onChange={(e) => validateTitle(e.target.value)}
        />
        {titleError && <p className="text-red-500 mb-2">{titleError}</p>}
        <Textarea
          placeholder="내용을 적어주세요."
          id="content"
          className="mt-4 w-full h-64 p-4 mb-5 border-transparent rounded-lg focus:ring-2 focus:ring-[#FF7A85] focus:border-[#FF7A85] outline-none transition-all duration-300 resize-none placeholder-gray-400 text-black"
          value={content}
          onChange={(e) => validateContent(e.target.value)}
        />
        {contentError && <p className="text-red-500 mt-2">{contentError}</p>}
      </div>

      <div className="flex">
        <div className="flex">
          {previews.map((preview, index) => (
            <div key={index} className="relative mr-2">
              <div className="relative w-[100px] h-[100px]">
                <Image src={preview} alt={`preview-${index}`} layout="fill" objectFit="cover" className="rounded-lg" />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  onClick={() => handleRemovePrevFile(index)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        <label className="flex justify-center items-center cursor-pointer bg-gray-200 rounded-lg w-[100px] h-[100px]">
          <Image src={iconCamera} alt="이미지 추가" width={30} height={30} />
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleUploadFiles} />
        </label>
      </div>
      {imageError && <p className="text-red-500 mt-2">{imageError}</p>}

      <div className="mt-8">
        <div className="flex justify-end space-x-4">
          <Button
            onClick={handleSubmit}
            type="button"
            className="px-6 py-2 bg-[#FF848F] text-white rounded-lg hover:bg-[#FF7A85] transition duration-300"
          >
            등록하기
          </Button>
          <Button
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            <Link href={`/posting-detail/${id}`}>취소하기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostingUpdateForm;
