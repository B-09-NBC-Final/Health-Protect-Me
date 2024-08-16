'use client'
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/supabase/client';
import { useUserStore } from '@/store/userStore';
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import carbohydrate from '@/assets/icons/carbohydrate.png';
import protein from '@/assets/icons/protein.png';
import fat from '@/assets/icons/fat.png';
import running from '@/assets/icons/running_man.png';
import dumbbel from '@/assets/icons/dumbbel.png';
import clock from '@/assets/icons/clock.png';
import Button from '@/components/Common/Button';
import Loading from '@/components/LoadingPage/Loading';

type UserData = {
  year_of_birth: number | null;
  weight: number | null;
  gender: string;
  height: number | null;
  purpose: string;
};

const useUserData = (userId: string) => {
  const supabase = createClient();

  return useQuery({
    queryKey: ['userData', userId],
    queryFn: async () => {
      const { data: infoData, error: infoError } = await supabase
        .from('information')
        .select('created_at, sync_user_data, year_of_birth, weight, gender, height, purpose, user_id, result_diet, result_exercise')
        .eq('user_id', userId)
        .single();

      if (infoError) throw infoError;
      return infoData;
    },
    enabled: !!userId,
  });
};

const InforDetailPage = () => {
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
  const [currentDay, setCurrentDay] = useState(0);
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [syncUserData, setSyncUserData] = useState<boolean | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  const { data: userData, isLoading, error } = useUserData(userId);

  const gptMutation = useMutation({
    mutationFn: async (userData: UserData) => {
      const response = await fetch('/api/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('API 요청에 실패하였습니다.');
      return response.json();
    },
    onSuccess: async (data) => {
      const parsedResults = parseAiResults(data.data);
      if (!parsedResults) throw new Error('AI 결과 파싱에 실패했습니다.');

      await saveResultsToSupabase(parsedResults);
      queryClient.invalidateQueries({ queryKey: ['userData', userId] });
    },
  });

  useEffect(() => {
    if (userData) {
      if (userData.created_at) {
        const createdAtDate = new Date(userData.created_at);
        setCreatedAt(createdAtDate);

        const today = new Date();
        const diffTime = Math.abs(today.getTime() - createdAtDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        setCurrentDay(diffDays % 7);
      }

      if (userData.result_diet) {
        const parsedDietData = JSON.parse(userData.result_diet);
        if (parsedDietData.length > 0) {
          const dayData = parsedDietData[currentDay];
          setMeal([dayData.breakfast, dayData.lunch, dayData.dinner, { menu: '', ratio: '', calories: dayData.totalCalories }]);
        }
      }

      if (userData.result_exercise) {
        const parsedExerciseData = JSON.parse(userData.result_exercise);
        if (parsedExerciseData.length > 0) {
          setWork(parsedExerciseData[currentDay]);
        }
      }

      setSyncUserData(userData.sync_user_data);
    }
  }, [userData, currentDay]);

  // ai 결과 식단과 운동 나누기
  const parseAiResults = (result: string) => {
    if (!result) return null;
    const days = result.split('@').slice(1);
    const dietPlans = days.map((day) => parseDiet(day));
    const exercises = days.map((day) => parseExercise(day.split('~추천운동')[1]));

    return {
      result_diet: JSON.stringify(dietPlans),
      result_exercise: JSON.stringify(exercises)
    };
  };

  // 식단 쪼개기
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

  // 운동 쪼개기
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

  // supabase에 바뀐 식단과 운동 저장
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

  // gpt 재호출
  const resetGptCall = async () => {
    if (userData) {
      gptMutation.mutate({
        year_of_birth: userData.year_of_birth,
        weight: userData.weight,
        gender: userData.gender,
        height: userData.height,
        purpose: userData.purpose
      });
    }
  }

  // 탄단지 비율 쪼개기
  const extractRatios = (ratioString: string) => {
    const ratios = ratioString.match(/\d+/g);
    return {
      carbohydrates: ratios ? parseInt(ratios[0], 10) : 0,
      proteins: ratios ? parseInt(ratios[1], 10) : 0,
      fats: ratios ? parseInt(ratios[2], 10) : 0
    };
  };

  if (meal.length === 0 || !work) return null;

  // 각 식사의 탄단지 쪼개기
  const breakfastRatios = extractRatios(meal[0].ratio);
  const lunchRatios = extractRatios(meal[1].ratio);
  const dinnerRatios = extractRatios(meal[2].ratio);

  if (isLoading) return <Loading />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="border-gray100 border border-solid rounded-xl py-[24px] px-10 bg-white s:w-full s:py-2 s:px-0 s:border-none s:bg-transparent">
      {gptMutation.status === 'pending' && <Loading />}
      <div>
        <h1 className="text-2xl text-gray-900 font-medium mb-2">오늘의 추천 식단</h1>
        <div>
          {syncUserData === false ? (
            <div className='my-5'>
              <p className='text-gray-800 pb-2'>프로필 정보가 변경되었어요. 새로운 목표에 맞춘 식단을 다시 받아보세요!</p>
              <Button
                buttonName="새로운 식단 추천받기"
                onClick={resetGptCall}
                bgColor="bg-white"
                boxShadow="none"
                textColor="text-primary600"
                paddingY="py-2"
                border="border-primary500"
                buttonWidth="w-[160px] s:w-[160px]"
              >
              </Button>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">AI 분석을 바탕으로 매일 맞춤 식단을 추천해 드려요</p>
          )}
        </div>
        <div className="inline-flex gap-10 flex-col items-start flex-[0_0_auto] pb-14 s:pb-6">
          <div className="flex gap-10 s:flex-col s:gap-6">
            <Card className="!flex-[0_0_auto] shadow-floating overflow-hidden w-[400px] rounded-[20px] flex flex-col s:w-[320px]">
              <CardHeader className="!text-color-text-sub">
                <CardDescription className="text-[#3E9B2E] font-semibold">아침</CardDescription>
                <CardDescription className="text-black text-base mt-2">{meal[0].menu.trim().replace(/^-/, '')}</CardDescription>
                <p className="text-[#76797F] mt-1">{meal[0].calories.replace('&칼로리:', '')}</p>
              </CardHeader>
              <CardContent className="overflow-auto max-h-[200px] mt-auto">
                <div className="flex justify-center space-x-5 s:space-x-3">
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={carbohydrate}
                      alt="carbohydrate"
                      width={32} height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className='text-[#76797F] s:text-sm'>탄수화물</p>
                    <p className='text-gray-900 s:text-sm'>{breakfastRatios.carbohydrates}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={protein}
                      alt="protein"
                      width={32}
                      height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className='text-[#76797F] s:text-sm'>단백질</p>
                    <p className='text-gray-900 s:text-sm'>{breakfastRatios.proteins}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={fat}
                      alt="fat"
                      width={32}
                      height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className='text-[#76797F] s:text-sm'>지방</p>
                    <p className='text-gray-900 s:text-sm'>{breakfastRatios.fats}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="!flex-[0_0_auto] shadow-floating overflow-hidden w-[400px] s:w-[320px] rounded-[20px] flex flex-col">
              <CardHeader className="!text-color-text-sub">
                <CardDescription className="text-[#3E9B2E] font-semibold">점심</CardDescription>
                <CardDescription className="text-black text-base mt-2">{meal[1].menu.trim().replace(/^-/, '')}</CardDescription>
                <p className="text-[#76797F] mt-1">{meal[0].calories.replace('&칼로리:', '')}</p>
              </CardHeader>
              <CardContent className="overflow-auto max-h-[200px] mt-auto">
                <div className="flex justify-center space-x-5 s:space-x-3">
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={carbohydrate}
                      alt="carbohydrate"
                      width={32} height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className="text-[#76797F] s:text-sm">탄수화물</p>
                    <p className="text-gray-900 s:text-sm">{lunchRatios.carbohydrates}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={protein}
                      alt="protein"
                      width={32}
                      height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className="text-[#76797F] s:text-sm">단백질</p>
                    <p className="text-gray-900 s:text-sm">{lunchRatios.proteins}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={fat}
                      alt="fat"
                      width={32}
                      height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className="text-[#76797F] s:text-sm">지방</p>
                    <p className="text-gray-900 s:text-sm">{lunchRatios.fats}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="!flex-[0_0_auto] shadow-floating overflow-hidden w-[400px] s:w-[320px] rounded-[20px] flex flex-col">
              <CardHeader className="!text-color-text-sub">
                <CardDescription className="text-[#3E9B2E] font-semibold">저녁</CardDescription>
                <CardDescription className="text-black text-base mt-2">{meal[2].menu.trim().replace(/^-/, '')}</CardDescription>
                <p className="text-[#76797F] mt-1">{meal[0].calories.replace('&칼로리:', '')}</p>
              </CardHeader>
              <CardContent className="overflow-auto max-h-[200px] mt-auto">
                <div className="flex justify-center space-x-5 s:space-x-3">
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={carbohydrate}
                      alt="carbohydrate"
                      width={32}
                      height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className='text-[#76797F] s:text-sm'>탄수화물</p>
                    <p className='text-gray-900 s:text-sm'>{dinnerRatios.carbohydrates}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={protein}
                      alt="protein"
                      width={32}
                      height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className='text-[#76797F] s:text-sm'>단백질</p>
                    <p className='text-gray-900 s:text-sm'>{dinnerRatios.proteins}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center w-[104px] h-[104px] rounded-full bg-gray75 s:w-[88px] s:h-[88px]">
                    <Image
                      src={fat}
                      alt="fat"
                      width={32}
                      height={32}
                      className="s:w-[24px] s:h-[24px]"
                    />
                    <p className='text-[#76797F] s:text-sm'>지방</p>
                    <p className='text-gray-900 s:text-sm'>{dinnerRatios.fats}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="relative self-stretch font-desktop-subtitle2 font-[number:var(--desktop-subtitle2-font-weight)] text-gray-600 text-[length:var(--desktop-subtitle2-font-size)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] [font-style:var(--desktop-subtitle2-font-style)]">
            <span className="font-[number:var(--desktop-subtitle2-font-weight)] font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
              목표를 위한 일일 권장 칼로리 섭취량은{' '}
            </span>
            <span className="text-[#3E9B2E] font-bold font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
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
      <div className="w-full pt-14 s:pt-6">
        <h1 className="text-2xl text-gray-900 font-medium mb-2">오늘의 운동 플랜</h1>
        <p className="text-gray600 mb-6">목표를 더 빠르게 달성할 수 있도록 식단과 함께하면 좋은 최적의 운동이에요</p>
        <div className="flex gap-4 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div className="flex items-center mb-4">
              <Image src={running} alt="running" width={48} height={48} />
              <div className="font-bold text-gray-900 text-lg ml-2">{work.type}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6 relative w-full flex-[0_0_auto]">
          <Card className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-white rounded-[20px] shadow-floating s:w-[320px] s:p-4">
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <Image src={dumbbel} alt="dumbbel" width={24} height={24} />
                <div className="relative w-fit text-sm text-gray900 font-semibold ">운동 방법</div>
              </div>
              <p className="relative w-fit text-gray800 font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
                {work.method.split('\n').map((line, index) => (
                  <div className="pt-2" key={index}>{line}</div>
                ))}
              </p>
            </div>
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <Image src={clock} alt="clock" width={24} height={24} className="text-green-500" />
                <div className="relative w-fit text-sm text-gray900 font-semibold">운동 시간</div>
              </div>
              <div className="relative w-fit text-gray800 font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
                {work.duration}
              </div>
            </div>
          </Card>
          <Card className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-white rounded-[20px] shadow-floating s:w-[320px] s:p-4">
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <div className="text-sm text-gray900 font-semibold w-fit">추가 팁</div>
              </div>
              <p className="text-gray800 relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
                {work.tip}
              </p>
            </div>
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <div className="text-sm text-gray900 font-semibold w-fit ">주요 효과</div>
              </div>
              <p className="text-gray800 relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
                {work.effect}
              </p>
            </div>
            <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <div className="text-sm text-gray900 font-semibold w-fit ">주의 사항</div>
              </div>
              <p className="text-gray800 relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
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