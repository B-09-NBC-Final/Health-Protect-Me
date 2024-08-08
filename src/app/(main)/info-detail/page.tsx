'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';
import { useUserStore } from '@/store/userStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import carbohydrate from '@/assets/icons/carbohydrate.png';
import protein from '@/assets/icons/protein.png';
import fat from '@/assets/icons/fat.png';
import running from '@/assets/icons/running_man.png';
import dumbbel from '@/assets/icons/dumbbel.png';
import clock from '@/assets/icons/clock.png';
import { Result } from 'postcss';

type PostgrestError = {
  message: string;
};

const InforDetailPage = () => {
  const [resultDiet, setResultDiet] = useState('');
  const [resultExercise, setResultExercise] = useState('');
  const [error, setError] = useState<PostgrestError | null>(null);
  const [userId, setUserId] = useState('');
  const { user } = useUserStore();
  const [meal, setMeal] = useState<{ calories: string; menu: string; ratio: string }[]>([]);
  const [work, setWork] = useState<{
    type: string;
    method: string;
    tip: string;
    duration: string;
    effect: string;
    caution: string;
  }>({
    type: '',
    method: '',
    tip: '',
    duration: '',
    effect: '',
    caution: ''
  });
  const [syncUserData, setSyncUserData] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return; // userId가 없으면 fetchData 실행하지 않음

      const supabase = createClient();

      // sync_user_data 상태 가져오기
      const { data: syncData, error: syncError } = await supabase
        .from('information')
        .select('sync_user_data')
        .eq('user_id', userId)
        .single();

      if (syncError) {
        console.error('Error fetching sync user data status:', syncError);
        setSyncUserData(false);
      } else {
        setSyncUserData(syncData.sync_user_data);
      }

      const { data: userData, error: userError } = await supabase
        .from('information')
        .select('year_of_birth, weight, gender, height, purpose, user_id')
        .eq('user_id', userId)
        .single();

      if (userError) setError(userError);

      if (userData) {
        setUserId(userData.user_id || '');

        // 기존의 식단과 운동 결과를 가져오는 로직
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

        if (dietError) setError(dietError);
        if (exerciseError) setError(exerciseError);

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

        // GPT API 호출하여 새로운 식단 및 운동 결과 받기
        await callGPTAPI(userData);
      }
    };

    fetchData();
  }, [userId]);

  // GPT API 호출 함수
  const callGPTAPI = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          year_of_birth: userData.year_of_birth,
          weight: userData.weight,
          gender: userData.gender,
          height: userData.height,
          purpose: userData.purpose
        })
      });

      if (!response.ok) {
        throw new Error('API 요청에 실패하였습니다.');
      }

      const content = await response.json();
      const parsedResults = parseAiResults(content.data);

      console.log("content", content);
      console.log("parsedResults", parsedResults);

      if (!parsedResults) {
        throw new Error('AI 결과 파싱에 실패했습니다.');
      }

      setResultDiet(parsedResults.result_diet);
      setResultExercise(parsedResults.result_exercise);

      // Supabase에 저장
      await saveResultsToSupabase(parsedResults);

    } catch (error) {
      console.error('API 요청 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // AI 결과 파싱 함수
  const parseAiResults = (result: string) => {
    if (!result) return null;

    const days = result.split('@').slice(1);
    const dietPlans = days.map((day) => parseDiet(day));
    const exercise = parseExercise(days[0].split('~추천운동')[1]);

    return {
      result_diet: JSON.stringify(dietPlans),
      result_exercise: JSON.stringify(exercise)
    };
  };

  // 식단 파싱 함수
  const parseDiet = (dayString: string) => {
    const sections = dayString.split('\n');
    const diet = {
      day: '',
      breakfast: { menu: '', ratio: '', calories: '' },
      lunch: { menu: '', ratio: '', calories: '' },
      dinner: { menu: '', ratio: '', calories: '' },
      totalCalories: ''
    };

    let currentMeal = null;

    sections.forEach((line) => {
      if (line.startsWith('@')) diet.day = line.substring(1).trim();
      else if (line.startsWith('#')) {
        currentMeal = diet.breakfast;
        if (line.startsWith('#?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
        else if (line.startsWith('#-')) currentMeal.menu += line.substring(1).trim() + '\n';
        else if (line.startsWith('#$')) currentMeal.ratio = line.substring(1).trim();
        else if (line.startsWith('#&')) currentMeal.calories = line.substring(1).trim();
      } else if (line.startsWith('^')) {
        currentMeal = diet.lunch;
        if (line.startsWith('^?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
        else if (line.startsWith('^-')) currentMeal.menu += line.substring(1).trim() + '\n';
        else if (line.startsWith('^$')) currentMeal.ratio = line.substring(1).trim();
        else if (line.startsWith('^&')) currentMeal.calories = line.substring(1).trim();
      } else if (line.startsWith('!')) {
        currentMeal = diet.dinner;
        if (line.startsWith('!?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
        else if (line.startsWith('!-')) currentMeal.menu += line.substring(1).trim() + '\n';
        else if (line.startsWith('!$')) currentMeal.ratio = line.substring(1).trim();
        else if (line.startsWith('!&')) currentMeal.calories = line.substring(1).trim();
      } else if (line.startsWith('*')) diet.totalCalories = line.substring(1).trim();
    });

    return diet;
  };

  // 운동 파싱 함수
  const parseExercise = (exerciseString: string) => {
    if (!exerciseString) return null;
    const lines = exerciseString.split('\n');
    const exercise = {
      type: '',
      method: '',
      tip: '',
      duration: '',
      effect: '',
      caution: ''
    };

    let currentKey: keyof typeof exercise | null = null;

    lines.forEach((line) => {
      if (line.startsWith('운동종류:')) {
        exercise.type = line.substring(5).trim();
        currentKey = 'type';
      } else if (line.startsWith('운동방법:')) {
        exercise.method = line.substring(5).trim();
        currentKey = 'method';
      } else if (line.startsWith('운동 팁:')) {
        exercise.tip = line.substring(5).trim();
        currentKey = 'tip';
      } else if (line.startsWith('운동 횟수 및 시간:')) {
        exercise.duration = line.substring(11).trim();
        currentKey = 'duration';
      } else if (line.startsWith('운동의 영향:')) {
        exercise.effect = line.substring(7).trim();
        currentKey = 'effect';
      } else if (line.startsWith('주의사항:')) {
        exercise.caution = line.substring(5).trim();
        currentKey = 'caution';
      } else if (currentKey === 'method' && line.trim() !== '') {
        exercise.method += '\n' + line.trim();
      }
    });

    if (exercise.method.startsWith('\n')) {
      exercise.method = exercise.method.substring(1).trim();
    }

    return exercise;
  };

  // Supabase에 결과 저장 함수
  const saveResultsToSupabase = async (parsedResults: { result_diet: string; result_exercise: string }) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('information')
      .update({
        result_diet: parsedResults.result_diet,
        result_exercise: parsedResults.result_exercise,
        sync_user_data: true
      })
      .eq('user_id', userId);

    if (error) {
      throw new Error('결과를 저장하는 중 오류가 발생했습니다.');
    }
  };

  if (meal.length === 0 || !work) return null;

  const extractRatios = (ratioString: string) => {
    const ratios = ratioString.match(/\d+/g);
    return {
      carbohydrates: ratios ? parseInt(ratios[0], 10) : 0,
      proteins: ratios ? parseInt(ratios[1], 10) : 0,
      fats: ratios ? parseInt(ratios[2], 10) : 0
    };
  };

  // 각 식사에서 비율 분리
  const breakfastRatios = extractRatios(meal[0].ratio);
  const lunchRatios = extractRatios(meal[1].ratio);
  const dinnerRatios = extractRatios(meal[2].ratio);

  return (
    <div className="border-gray100 border border-solid rounded-xl py-[24px] px-10 bg-white">
      <div>
        <h1 className="text-2xl font-medium mb-2">오늘의 추천 식단</h1>
        <div>
          {syncUserData === false && (
            <div className='flex'>
              <p className='text-red-500'>정보가 바뀌었네요! 식단을 다시 받아 보시겠어요?</p>
              <button onClick={() => callGPTAPI(user)}>식단 다시 받기</button>
            </div>
          )}
        </div>
        <p className="text-gray600 mb-6">AI 분석을 바탕으로 매일 맞춤 식단을 추천해 드려요</p>
        <div className="inline-flex gap-9 flex-col items-start flex-[0_0_auto] pb-14">
          <div className="flex gap-10">
            <Card className="!flex-[0_0_auto] shadow-floating overflow-hidden w-[400px]">
              <CardHeader className="!text-color-text-sub">
                <CardDescription style={{ color: '#3E9B2E', fontWeight: '600' }}>아침</CardDescription>
                <CardDescription className="text-black h-10 text-base">{meal[0].menu}</CardDescription>
                <p style={{ color: '#76797F', marginTop: '8px' }}>{meal[0].calories.replace('&칼로리:', '')}</p>
              </CardHeader>
              <CardContent className="overflow-auto max-h-[200px]">
                <div className="flex justify-center space-x-4">
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={carbohydrate} alt="carbohydrate" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>탄수화물</p>
                    <p>{breakfastRatios.carbohydrates}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={protein} alt="protein" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>단백질</p>
                    <p>{breakfastRatios.proteins}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={fat} alt="fat" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>지방</p>
                    <p>{breakfastRatios.fats}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="!flex-[0_0_auto] shadow-floating w-[400px]">
              <CardHeader className="!text-color-text-sub">
                <CardDescription style={{ color: '#3E9B2E', fontWeight: '600' }}>점심</CardDescription>
                <CardDescription className="text-black h-10 text-base">{meal[1].menu}</CardDescription>
                <p style={{ color: '#76797F', marginTop: '8px' }}>{meal[0].calories.replace('&칼로리:', '')}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={carbohydrate} alt="carbohydrate" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>탄수화물</p>
                    <p>{lunchRatios.carbohydrates}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={protein} alt="protein" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>단백질</p>
                    <p>{lunchRatios.proteins}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={fat} alt="fat" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>지방</p>
                    <p>{lunchRatios.fats}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="!flex-[0_0_auto] shadow-floating w-[400px]">
              <CardHeader className="!text-color-text-sub">
                <CardDescription style={{ color: '#3E9B2E', fontWeight: '600' }}>저녁</CardDescription>
                <CardDescription className="text-black h-10 text-base">{meal[2].menu}</CardDescription>
                <p style={{ color: '#76797F', marginTop: '8px' }}>{meal[0].calories.replace('&칼로리:', '')}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={carbohydrate} alt="carbohydrate" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>탄수화물</p>
                    <p>{dinnerRatios.carbohydrates}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={protein} alt="protein" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>단백질</p>
                    <p>{dinnerRatios.proteins}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75">
                    <Image src={fat} alt="fat" width={32} height={32} />
                    <p style={{ color: '#76797F' }}>지방</p>
                    <p>{dinnerRatios.fats}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="relative self-stretch font-desktop-subtitle2 font-[number:var(--desktop-subtitle2-font-weight)] text-gray-600 text-[length:var(--desktop-subtitle2-font-size)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] [font-style:var(--desktop-subtitle2-font-style)]">
            <span className="font-[number:var(--desktop-subtitle2-font-weight)] font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
              목표를 위한 일일 권장 칼로리 섭취량은{' '}
            </span>
            <span className="font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
              {meal[3].calories.replace('총 칼로리:', '')}
            </span>
            <span className="font-[number:var(--desktop-subtitle2-font-weight)] font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
              {' '}
              입니다.
            </span>
          </p>
        </div>
      </div>
      <hr className="border-t border-gray-300 w-full" />
      <div className="w-full pt-14">
        <h1 className="text-2xl font-medium mb-2">오늘의 운동 플랜</h1>
        <p className="text-gray600 mb-6">목표를 더 빠르게 달성할 수 있도록 식단과 함께하면 좋은 최적의 운동이에요</p>
        <div className="flex gap-4 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div className="flex items-center mb-4">
              <Image src={running} alt="running" width={48} height={48} />
              <div className="font-bold text-black text-lg ml-2">{work.type}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6 relative w-full flex-[0_0_auto]">
          <Card className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-color-background-content rounded-[20px] shadow-floating">
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <Image src={dumbbel} alt="dumbbel" width={24} height={24} />
                <div className="relative w-fit text-sm text-gray900 font-semibold ">운동 방법</div>
              </div>
              <p className="relative w-fit text-gray800 font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                {work.method}
              </p>
            </div>
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <Image src={clock} alt="clock" width={24} height={24} className="text-green-500" />
                <div className="relative w-fit text-sm text-gray900 font-semibold">운동 시간</div>
              </div>
              <div className="relative w-fit text-gray800 font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                {work.duration}
              </div>
            </div>
          </Card>
          <Card className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-color-background-content rounded-[20px] shadow-floating">
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <div className="text-sm text-gray900 font-semibold w-fit">추가 팁</div>
              </div>
              <p className="text-gray800 relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                {work.tip}
              </p>
            </div>
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <div className="text-sm text-gray900 font-semibold w-fit ">주요 효과</div>
              </div>
              <p className="text-gray800 relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                {work.effect}
              </p>
            </div>
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <div className="text-sm text-gray900 font-semibold w-fit ">주의 사항</div>
              </div>
              <p className="text-gray800 relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                {work.caution}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InforDetailPage;
