import { Textarea } from '@/components/ui/textarea';
import TextareatBtn from '../Btn/TextareatBtn';
import { Input } from '@/components/ui/input';

const TextareaPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">커뮤니티 글 작성</h1>
        <Input
          type="text"
          placeholder="제목을 입력 해주세요."
          className="w-full p-2 mb-4 border-b border-transparent focus:border-[#FF7A85] focus:outline-none transition-colors duration-300 placeholder-gray-400 text-black"
        />
        <Textarea
          placeholder="내용을 적어주세요."
          id="message-2"
          className="w-full h-64 p-4 border-transparent rounded-lg focus:ring-2 focus:ring-[#FF7A85] focus:border-[#FF7A85] outline-none transition-all duration-300 resize-none placeholder-gray-400 text-black"
        />
        <p className="mt-2 text-sm text-black">당신의 이야기를 들려주세요.</p>
      </div>
      <TextareatBtn />
    </div>
  );
};

export default TextareaPage;
