'use client';
import { Textarea } from '@/components/ui/textarea';
import TextareatBtn from '../Btn/TextareatBtn';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { uuid } from 'uuidv4';
import Image from 'next/image';

const supabase = createClient();

const TextareaPage = () => {
  const [selectCategory, setSelectCategory] = useState<string[]>([]);
  const [fileUrl, setFileUrl] = useState<string[]>([]);
  const [uploadFile, setUploadFile] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">게시글 작성</h1>
        <p className="mt-1 text-sm text-blue-500">당신의 이야기를 들려주세요.</p>
        <Input
          type="text"
          placeholder="제목을 입력 해주세요."
          className="mt-10 w-full p-2 mb-4 border-b border-transparent focus:border-[#FF7A85] focus:outline-none transition-colors duration-300 placeholder-gray-400 text-black"
        />
        <p className="border-solid border-2"></p>
        <Textarea
          placeholder="내용을 적어주세요."
          id="content"
          className="mt-5 w-full h-64 p-4 border-transparent rounded-lg focus:ring-2 focus:ring-[#FF7A85] focus:border-[#FF7A85] outline-none transition-all duration-300 resize-none placeholder-gray-400 text-black"
        />
      </div>
      <div className="flex items-start space-x-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative ">
              <div className="relative p-10">
                <div>
                  <Image
                    src={preview}
                    alt={`preview-${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs"
                  onClick={() => handleRemovePrevFile(index)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <label className="flex items-center cursor-pointer">
        <Image src="/add_image_icon.png" alt="addImg" width={30} height={30} className="" />
        <input type="file" id="test" multiple accept="image/*" className="hidden" onChange={handleUploadFiles} />
      </label>
      <div>
        <TextareatBtn />
      </div>
    </div>
  );
};

export default TextareaPage;
