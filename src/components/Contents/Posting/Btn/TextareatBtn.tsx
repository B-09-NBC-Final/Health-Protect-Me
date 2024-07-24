import { Button } from '@/components/ui/button';

const TextareatBtn = () => {
  return (
    <>
      <div className="flex justify-end space-x-4">
        <Button className="px-6 py-2 bg-[#FF848F] text-white rounded-lg hover:bg-[#FF7A85] transition duration-300">
          등록하기
        </Button>
        <Button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300">
          취소하기
        </Button>
      </div>
    </>
  );
};

export default TextareatBtn;
