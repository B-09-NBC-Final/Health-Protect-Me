import iconPlus from '@/assets/icons/icon_plus_white.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FloatingButton = () => {
  const router = useRouter();

  const writePost = () => {
    router.push('/posting');
  };

  return (
    <button
      type="button"
      className="hidden w-12 h-12 bg-pramary500 rounded-full s:flex s:justify-center s:items-center s:fixed s:bottom-[15%] s:right-5 s:shadow-floating-btn"
      onClick={writePost}
    >
      <Image src={iconPlus} alt="글 작성하기" width={32} height={32} />
    </button>
  );
};

export default FloatingButton;
