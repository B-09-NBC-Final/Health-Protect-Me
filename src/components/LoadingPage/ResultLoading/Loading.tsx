import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingAnimation: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const messages: string[] = [
    'AI가 나만을 위한 맞춤 식단과 운동을 깊게 고민하고 있어요!',
    '목표 달성을 위한 식단 생성중...\n효율적인 운동 플랜 생성중..',
    'TIP! 균형 잡힌 식단과 매일 30분 운동이 건강에 변화를 줄 거예요'
  ];

  const plateImages = [
    '/assets/image/aniImage/1.empty.png',
    '/assets/image/aniImage/2.lectuce1.png',
    '/assets/image/aniImage/3.lectuce2.png',
    '/assets/image/aniImage/4.tomato1.png',
    '/assets/image/aniImage/5.tomato2.png',
    '/assets/image/aniImage/6.cucumber1.png',
    '/assets/image/aniImage/7.cucumber2.png',
    '/assets/image/aniImage/8.cucumber3.png',
    '/assets/image/aniImage/9.egg1.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % 5);
    }, 1000);

    const messageInterval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-4 mb-8">
        {plateImages.map((img, index) => (
          <div
            key={index}
            className={`w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden
              ${index === step ? 'border-4 border-blue-500' : ''}`}
          >
            <Image
              src={img}
              alt={`Loading step ${index + 1}`}
              width={96}
              height={96}
              className={`transition-opacity duration-300 ${
                index <= step ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        ))}
      </div>
      <div className="text-center max-w-md">
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