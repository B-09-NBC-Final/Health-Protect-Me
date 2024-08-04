'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { useUserStore } from '@/store/userStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

type PostgrestError = {
  message: string;
}

const InforDetailPage = () => {
  const [resultDiet, setResultDiet] = useState('');
  const [resultExercise, setResultExercise] = useState('');
  const [error, setError] = useState<PostgrestError | null>(null);
  const [userId, setUserId] = useState('');
  const { user } = useUserStore();
  const [meal, setMeal] = useState<{ calories: string, menu: string, ratio: string }[]>([]);
  const [work, setWork] = useState<{ type: string, method: string, tip: string, duration: string, effect: string, caution: string }>({
    type: '',
    method: '',
    tip: '',
    duration: '',
    effect: '',
    caution: ''
  });

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return; // userId가 없으면 fetchData 실행하지 않음

      const supabase = createClient();

      const { data: userData, error: userError } = await supabase
        .from('information')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      const { data: dietData, error: dietError } = await supabase
        .from('information')
        .select('result_diet')
        .eq('user_id', userId)
        .single();

      const { data: exerciseData, error: exerciseError } = await supabase
        .from('information')
        .select('result_exercise')
        .eq('user_id', userId)
        .single();

      if (userError) setError(userError);
      if (dietError) setError(dietError);
      if (exerciseError) setError(exerciseError);

      if (userData) setUserId(userData.user_id || '');

      if (dietData) {
        setResultDiet(dietData.result_diet || '');
        const parsedDietData = JSON.parse(dietData.result_diet || '[]');
        if (parsedDietData.length > 0) {
          const { breakfast, lunch, dinner, totalCalories } = parsedDietData[0];
          setMeal([breakfast, lunch, dinner, { menu: '', ratio: '', calories: totalCalories }]);
        }
      }

      if (exerciseData) {
        setResultExercise(exerciseData.result_exercise || '');
        const work = JSON.parse(exerciseData.result_exercise || '');
        setWork(work);
      }
    };

    fetchData();
  }, [userId]); // userId가 변경될 때마다 fetchData 실행

  if (meal.length === 0 || !work) return null;

  const extractRatios = (ratioString: string) => {
    const ratios = ratioString.match(/\d+/g);
    return {
      carbohydrates: ratios ? parseInt(ratios[0], 10) : 0,
      proteins: ratios ? parseInt(ratios[1], 10) : 0,
      fats: ratios ? parseInt(ratios[2], 10) : 0,
    };
  };

  // 각 식사에서 비율 분리
  const breakfastRatios = extractRatios(meal[0].ratio);
  const lunchRatios = extractRatios(meal[1].ratio);
  const dinnerRatios = extractRatios(meal[2].ratio);


  return (
    <div className='bg-[#f8faf8] flex flex-row justify-center w-full"'>
      <div className='bg-color-background-default w-[1920px] h-[1668px] relative'>
        <div className="flex flex-col w-[1360px] items-start gap-10 absolute top-[100px] left-[280px] bg-white rounded-[20px] border border-solid border-gray-100 overflow-auto">
          <div className="gap-6 flex flex-col items-start px-10 py-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex self-stretch w-full flex-col items-start gap-2 relative flex-[0_0_auto]">
              <div className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex-1 mt-[-1.00px] font-desktop-h3 font-[number:var(--desktop-h3-font-weight)] text-gray-900 text-[length:var(--desktop-h3-font-size)] tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] [font-style:var(--desktop-h3-font-style)]">
                  <h1 className="text-2xl">오늘의 추천 식단</h1>
                </div>
              </div>
              <p className="relative self-stretch font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-gray-600 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
                AI 분석을 바탕으로 매일 맞춤 식단을 추천해 드려요
              </p>
            </div>
            <div className="inline-flex gap-10 flex-col items-start relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-10 relative flex-[0_0_auto]">
                <Card className="!flex-[0_0_auto] shadow-floating overflow-hidden">
                  <CardHeader className="!text-color-text-sub">
                    <CardDescription style={{ color: '#3E9B2E' }}>아침</CardDescription>
                    <CardDescription>{meal[0].menu}</CardDescription>
                    <p style={{ color: '#76797F' }}>{meal[0].calories.replace('&칼로리:', '')}</p>
                  </CardHeader>
                  <CardContent className="overflow-auto max-h-[200px]"> {/* 최대 높이를 설정 */}
                    <div className="flex space-x-4">
                      <div className="flex flex-col items-center rounded-full bg-#F5F7FA">
                        <Image src='/assets/icons/carbohydrate.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>탄수화물</p>
                        <p>{breakfastRatios.carbohydrates}%</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image src='/assets/icons/protein.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>단백질</p>
                        <p>{breakfastRatios.proteins}%</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image src='/assets/icons/fat.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>지방</p>
                        <p>{breakfastRatios.fats}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="!flex-[0_0_auto] shadow-floating">
                  <CardHeader className="!text-color-text-sub">
                    <CardDescription style={{ color: '#3E9B2E' }}>점심</CardDescription>
                    <CardDescription>{meal[1].menu}</CardDescription>
                    <p style={{ color: '#76797F' }}>{meal[0].calories.replace('&칼로리:', '')}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <Image src='/assets/icons/carbohydrate.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>탄수화물</p>
                        <p>{lunchRatios.carbohydrates}%</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image src='/assets/icons/protein.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>단백질</p>
                        <p>{lunchRatios.proteins}%</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image src='/assets/icons/fat.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>지방</p>
                        <p>{lunchRatios.fats}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="!flex-[0_0_auto] shadow-floating">
                  <CardHeader className="!text-color-text-sub">
                    <CardDescription style={{ color: '#3E9B2E' }}>저녁</CardDescription>
                    <CardDescription>{meal[2].menu}</CardDescription>
                    <p style={{ color: '#76797F' }}>{meal[0].calories.replace('&칼로리:', '')}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <Image src='/assets/icons/carbohydrate.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>탄수화물</p>
                        <p>{dinnerRatios.carbohydrates}%</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image src='/assets/icons/protein.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>단백질</p>
                        <p>{dinnerRatios.proteins}%</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Image src='/assets/icons/fat.png' alt='' width={50} height={50} />
                        <p style={{ color: '#76797F' }}>지방</p>
                        <p>{dinnerRatios.fats}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <p className="relative self-stretch font-desktop-subtitle2 font-[number:var(--desktop-subtitle2-font-weight)] text-gray-600 text-[length:var(--desktop-subtitle2-font-size)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] [font-style:var(--desktop-subtitle2-font-style)]">
                <span className="font-[number:var(--desktop-subtitle2-font-weight)] font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
                  목표를 위한 일일 권장 칼로리 섭취량은{" "}
                </span>
                <span className="font-desktop-subtitle2 font-bold font-[number:var(--desktop-subtitle2-font-weight)] [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
                  {meal[3].calories.replace('총 칼로리:', '')}
                </span>
                <span className="font-[number:var(--desktop-subtitle2-font-weight)] font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
                  {" "}
                  입니다.
                </span>
              </p>
            </div>
          </div>
          <hr className="border-t border-gray-300 w-full" />
          <div className="gap-10 flex flex-col items-start px-10 py-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
              <div className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex-1 mt-[-1.00px] font-desktop-h3 font-[number:var(--desktop-h3-font-weight)] text-[length:var(--desktop-h3-font-size)] tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] [font-style:var(--desktop-h3-font-style)]">
                  <h1 className="text-2xl">오늘의 운동 플랜 </h1>
                </div>
              </div>
              <p className="relative self-stretch font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-gray-600 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
                목표를 더 빠르게 달성할 수 있도록 식단과 함께하면 좋은 최적의 운동이에요
              </p>
            </div>
            <div className="flex gap-4 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start gap-1 relative">
                  <Image src='/assets/icons/protein.png' alt='protein' width={50} height={50} />
                  <div className="font-bold text-black text-lg">
                    {work.type}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <Card className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-color-background-content rounded-[20px] shadow-floating">
                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <Image src='/assets/icons/protein.png' alt='' width={50} height={50} className="text-green-500" />
                    <div className="relative w-fit font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main text-[length:var(--desktop-h6-font-size)] tracking-[var(--desktop-h6-letter-spacing)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap [font-style:var(--desktop-h6-font-style)]">
                      운동 방법
                    </div>
                  </div>
                  <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                    {work.method}
                  </p>
                </div>
                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <Image src='/assets/icons/protein.png' alt='' width={50} height={50} className="text-green-500" />
                    <div className="relative w-fit font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main text-[length:var(--desktop-h6-font-size)] tracking-[var(--desktop-h6-letter-spacing)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap [font-style:var(--desktop-h6-font-style)]">
                      운동 시간
                    </div>
                  </div>
                  <div className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                    {work.duration}
                  </div>
                </div>
              </Card>
              <Card className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-color-background-content rounded-[20px] shadow-floating">
                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <div className="w-fit text-[length:var(--desktop-h6-font-size)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap relative mt-[-1.00px] font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main tracking-[var(--desktop-h6-letter-spacing)] [font-style:var(--desktop-h6-font-style)]">
                      추가 팁
                    </div>
                  </div>
                  <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                    {work.tip}
                  </p>
                </div>
                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <div className="w-fit text-[length:var(--desktop-h6-font-size)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap relative mt-[-1.00px] font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main tracking-[var(--desktop-h6-letter-spacing)] [font-style:var(--desktop-h6-font-style)]">
                      주요 효과
                    </div>
                  </div>
                  <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                    {work.effect}
                  </p>
                </div>
                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <div className="w-fit text-[length:var(--desktop-h6-font-size)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap relative mt-[-1.00px] font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main tracking-[var(--desktop-h6-letter-spacing)] [font-style:var(--desktop-h6-font-style)]">
                      주의 사항
                    </div>
                  </div>
                  <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                    {work.caution}
                  </p>
                </div>
              </Card>
              <Card className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-color-background-content rounded-[20px] shadow-floating">
                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <div className="w-fit text-[length:var(--desktop-h6-font-size)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap relative mt-[-1.00px] font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main tracking-[var(--desktop-h6-letter-spacing)] [font-style:var(--desktop-h6-font-style)]">
                      운동 루틴
                    </div>
                  </div>
                  <div className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                    1-2분간 빠른 속도로 걷습니다.
                  </div>
                  <div className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                    1-2분간 느리게 걷거나 회복합니다.
                  </div>
                  <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                    15-20분간 과정을 반복한 후, 마지막 5-10분은 빠르게 걷습니다.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <section>
    //     <h2>다이어트 계획 </h2>
    //     <div>
    //       <h3>아침</h3>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         메뉴 :{meal[0].menu}
    //       </pre>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         비율 :{meal[0].ratio}
    //       </pre>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         칼로리: {meal[0].calories}
    //       </pre>
    //     </div>
    //     <div>
    //       <h3>점심</h3>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         메뉴: {meal[1].menu}
    //       </pre>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         탄단지 비율: {meal[1].ratio}
    //       </pre>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         칼로리: {meal[1].calories}
    //       </pre>
    //     </div>
    //     <div>
    //       <h3>저녁</h3>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         메뉴: {meal[2].menu}
    //       </pre>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         탄단지 비율: {meal[2].ratio}
    //       </pre>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         칼로리: {meal[2].calories}
    //       </pre>
    //     </div>
    //     <div>
    //       <h3>총 칼로리</h3>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         {meal[3].calories}
    //       </pre>
    //     </div>
    //   </section>
    //   <section>
    //     <h2>운동 계획</h2>
    //     <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //       <p>유형: {work.type}</p>
    //       <p>방법: {work.method}</p>
    //       <p>팁: {work.tip}</p>
    //       <p>운동 시간 및 횟수: {work.duration}</p>
    //       <p>효과: {work.effect}</p>
    //       <p>주의사항: {work.caution}</p>
    //     </pre>
    //   </section>
    // </div>
  );
};

export default InforDetailPage;

