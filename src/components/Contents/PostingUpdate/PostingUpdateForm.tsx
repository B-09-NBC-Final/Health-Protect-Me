'use client';

import { createClient } from '@/supabase/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import iconImage from '@/assets/icons/icon_image.svg';
import iconClose from '@/assets/icons/icon_close.svg';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

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

  const handleCancel = () => {
    router.push(`/posting-detail/${id}`);
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
      <div>
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600"
          value={title}
          onChange={(e) => validateTitle(e.target.value)}
        />
        {titleError && <p className="text-backgroundError mt-1 text-sm">{titleError}</p>}
        <textarea
          placeholder="식단을 공유하거나, 자유롭게 이야기를 나눠보세요."
          className="border border-gray300 border-solid p-3 rounded-sm w-full text-gray900 placeholder:text-gray500 hover:border-gray600 focus:outline-none focus:border-secondary600 mt-2 h-[400px]"
          value={content}
          onChange={(e) => validateContent(e.target.value)}
        />
        <div className="flex">
          {contentError && <p className="text-backgroundError text-sm">{contentError}</p>}
          <p className="ml-auto text-gray600 text-sm">{content.length}/500</p>
        </div>
      </div>

      <div className="pb-10 border-b border-solid border-gray200">
        <div className="flex mt-4">
          <label className="flex flex-col items-center cursor-pointer border border-solid border-gray300 rounded-lg p-2 w-[76px] h-[76px]">
            <Image src={iconImage} alt="이미지 추가" width={36} height={36} />
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleUploadFiles} />
            <span className="text-gray600 text-sm mt-1">{fileUrl.length}/3</span>
          </label>
          <div className="flex">
            {previews.map((preview, index) => (
              <div key={index} className="relative ml-4">
                <div className="relative w-[76px] h-[76px]">
                  <Image
                    src={preview}
                    alt={`preview-${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <button
                    className="absolute top-1 right-1 bg-btnClose rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => handleRemovePrevFile(index)}
                  >
                    <i>
                      <Image src={iconClose} alt="이미지 삭제" width={16} height={16} />
                    </i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {imageError && <p className="text-backgroundError text-sm mt-1">{imageError}</p>}
      </div>

      <div className="mt-10">
        <div className="flex justify-center space-x-4">
          <Button
            buttonName="취소"
            onClick={handleCancel}
            bgColor="#FFFFFF"
            boxShadow="none"
            textColor="text-gray900"
            paddingY="py-2"
            border="border-gray400"
            buttonWidth="w-[192px]"
          ></Button>
          <Button
            buttonName="수정 완료"
            onClick={handleSubmit}
            bgColor="#FFFFFF"
            boxShadow="none"
            textColor="text-primary600"
            paddingY="py-2"
            border="border-primary500"
            buttonWidth="w-[192px]"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default PostingUpdateForm;
