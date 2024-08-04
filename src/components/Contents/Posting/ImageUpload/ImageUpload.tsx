import React from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@/supabase/client';
import iconImage from '@/assets/icons/icon_image.svg';
import iconClose from '@/assets/icons/icon_close.svg';

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
    <div className="flex pb-10 border-b border-solid border-gray200">
      {fileInfos.length < 3 && (
        <div className="flex">
          <label className="flex flex-col items-center cursor-pointer border border-solid border-gray300 rounded-lg p-2 w-[76px] h-[76px]">
            <Image src={iconImage} alt="이미지 추가" width={36} height={36} />
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleUploadFiles} />
            <span className="text-gray600 text-sm mt-1">{fileInfos.length}/3</span>
          </label>
        </div>
      )}
      <div className="flex">
        {fileInfos.map((info, index) => (
          <div key={index} className="relative ml-4">
            <div className="relative w-[76px] h-[76px]">
              <Image
                src={info.preview}
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
  );
};

export default ImageUpload;
