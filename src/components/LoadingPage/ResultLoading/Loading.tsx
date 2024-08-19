import React, { useState, useEffect } from 'react';
import DefaultLottie from '@/components/Lottie/Lottie';

const LoadingAnimation = () => {
  const [message, setMessage] = useState<string>('');

  const messages: string[] = [
    'AI가 나만을 위한 맞춤 식단과 운동을 \n깊게 고민하고 있어요!',
    '목표 달성을 위한 식단 생성중...\n효율적인 운동 플랜 생성중..',
    'TIP! 균형 잡힌 식단과 매일 30분 운동이 \n건강에 변화를 줄 거예요'
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-48 h-48">
        <DefaultLottie />
      </div>
      <div className="text-center max-w-md mt-8">
        {/* <h1 className='text-2xl font-medium'>
          AI가 나만을 위한 맞춤 식단과<br /> 운동을 깊게 고민하고 있어요!
        </h1>
        <div className='mt-10 space-y-4 w-[234px] text-left'>
          <p className=''>목표 달성을 위한 식단 생성중...</p>
          <p className=''>효율적인 운동 플랜 생성중..</p>
        </div>
        <div className='flex items-center mt-20'>
          <p className='text-2xl font-black text-[#F5637C] mr-2'>TIP</p>
          <p className='text-sm'>균형 잡힌 식단과 매일 30분의 운동이 건강에 큰 변화를 가져다줘요.</p>
        </div> */}
        <p className="text-lg font-semibold mb-4 h-16 flex items-center justify-center">
          {message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < message.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
