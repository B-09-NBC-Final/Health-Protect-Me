import React from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/supabase/client';
import imageUploadBtn from '@/assets/image/imageUploadBtn.png'

export type FileInfo = {
  file: File;
  preview: string;
  url: string;
};

export type ImageUploadProps = {
  fileInfos: FileInfo[];
  setFileInfos: React.Dispatch<React.SetStateAction<FileInfo[]>>;
  setImageError: React.Dispatch<React.SetStateAction<string | null>>;
};

const supabase = createClient();

const ImageUpload = ({ fileInfos, setFileInfos, setImageError }: ImageUploadProps) => {
  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList);
      for (const file of fileArray) {
        if (fileInfos.length < 3) {
          await addImgFile(file);
        } else {
          setImageError('최대 3개의 이미지만 업로드할 수 있습니다.');
          break;
        }
      }
    }
    setImageError(null);
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
      setImageError('이미지 업로드 중 문제가 발생했습니다. 다시 시도해주세요.');
      console.error(error);
    }
  };

  const handleRemovePrevFile = (index: number) => {
    setFileInfos((prev) => {
      const newFileInfos = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      return newFileInfos;
    });
  };

  return (
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
      {fileInfos.length < 3 && (
        <label className="flex items-center cursor-pointer">
          <Image src={imageUploadBtn} alt="addImg" width={50} height={50} className="mr-2" />
          <span className="text-sm text-blue-500">최대 3개</span>
          <input type="file" id="test" multiple accept="image/*" className="hidden" onChange={handleUploadFiles} />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;