import { Textarea } from '@/components/ui/textarea';
import TextareatBtn from '../Btn/TextareatBtn';
import { Input } from '@/components/ui/input';

const TextareaPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">커뮤니티 글 작성</h1>
        <br />
        <p className="mt-1 text-sm text-black">당신의 이야기를 들려주세요.</p>
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
      <TextareatBtn />
    </div>
  );
};

export default TextareaPage;
