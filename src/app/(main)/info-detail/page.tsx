'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';

type PostgrestError = {
  message: string;
}

const InforDetailPage = () => {
  const [resultDiet, setResultDiet] = useState('');
  const [resultExercise, setResultExercise] = useState('');
  const [error, setError] = useState<PostgrestError | null>(null);
  const [userId, setUserId] = useState<string>('44740f52-46f0-4282-aaf1-8862304a890e');
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
    const fetchData = async () => {
      const supabase = createClient();
      const { data: userData, error: userError } = await supabase
        .from('information')
        .select('user_id')
        .eq('user_id', "44740f52-46f0-4282-aaf1-8862304a890e")
        .single()

      const { data: dietData, error: dietError } = await supabase
        .from('information')
        .select('result_diet')
        .eq('user_id', userId)
        .single()

      // Assuming you want a single row
      console.log(22, dietData);

      const { data: exerciseData, error: exerciseError } = await supabase
        .from('information')
        .select('result_exercise')
        .eq('user_id', userId)
        .single(); // Assuming you want a single row
      console.log(33, exerciseData);

      if (userError) setError(userError);
      if (dietError) setError(dietError);
      if (exerciseError) setError(exerciseError);
      console.log(dietData?.result_diet, typeof dietData?.result_diet);
      console.log(exerciseData?.result_exercise);

      const meal = JSON.parse(dietData?.result_diet || '')[0]
      console.log("밀", meal);
      setMeal([meal.breakfast, meal.lunch, meal.dinner, meal.totalCalories])
      const parsedDietData = JSON.parse(dietData?.result_diet || '[]');
      if (parsedDietData.length > 0) {
        const { breakfast, lunch, dinner, totalCalories } = parsedDietData[0];
        setMeal([breakfast, lunch, dinner, { menu: '', ratio: '', calories: totalCalories }]);
      }


      if (userData) setUserId(userData.user_id || '');
      if (dietData) setResultDiet(dietData.result_diet || '');
      if (exerciseData) setResultExercise(exerciseData.result_exercise || '');
      if (exerciseData) {
        const work = JSON.parse(exerciseData.result_exercise || '');
        setWork(work);
        setResultExercise(exerciseData.result_exercise || '');
      }
    };
    fetchData();
  }, []);

  if (meal.length === 0 || !work) return null;

  return (
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
    <div className="flex flex-col w-[1360px] items-start gap-10 relative bg-color-background-white rounded-[20px] border border-solid border-gray-100">
      <div className="flex gap-6 self-stretch w-full flex-col items-start px-10 py-6 relative flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex-1 mt-[-1.00px] font-desktop-h3 font-[number:var(--desktop-h3-font-weight)] text-gray-900 text-[length:var(--desktop-h3-font-size)] tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] [font-style:var(--desktop-h3-font-style)]">
              오늘의 추천 식단
            </div>
          </div>
          <p className="relative self-stretch font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-gray-600 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
            AI 분석을 바탕으로 매일 맞춤 식단을 추천해 드려요
          </p>
        </div>
        <div className="inline-flex gap-10 flex-col items-start relative flex-[0_0_auto]">
          <div className="inline-flex items-center gap-10 relative flex-[0_0_auto]">

          </div>
          <p className="relative self-stretch font-desktop-subtitle2 font-[number:var(--desktop-subtitle2-font-weight)] text-color-text-sub text-[length:var(--desktop-subtitle2-font-size)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] [font-style:var(--desktop-subtitle2-font-style)]">
            <span className="font-[number:var(--desktop-subtitle2-font-weight)] font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
              목표를 위한 일일 권장 칼로리 섭취량은{" "}
            </span>
            <span className="font-desktop-subtitle2 font-[number:var(--desktop-subtitle2-font-weight)] [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
              2250 kcal
            </span>
            <span className="font-[number:var(--desktop-subtitle2-font-weight)] font-desktop-subtitle2 [font-style:var(--desktop-subtitle2-font-style)] tracking-[var(--desktop-subtitle2-letter-spacing)] leading-[var(--desktop-subtitle2-line-height)] text-[length:var(--desktop-subtitle2-font-size)]">
              {" "}
              입니다.
            </span>
          </p>
        </div>
      </div>
      <div className="inline-flex gap-10 flex-col items-start px-10 py-6 relative flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex-1 mt-[-1.00px] font-desktop-h3 font-[number:var(--desktop-h3-font-weight)] text-gray-900 text-[length:var(--desktop-h3-font-size)] tracking-[var(--desktop-h3-letter-spacing)] leading-[var(--desktop-h3-line-height)] [font-style:var(--desktop-h3-font-style)]">
              오늘의 운동 플랜
            </div>
          </div>
          <p className="relative self-stretch font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-gray-600 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] [font-style:var(--desktop-p-md-font-style)]">
            목표를 더 빠르게 달성할 수 있도록 식단과 함께하면 좋은 최적의 운동이에요
          </p>
        </div>
        <div className="flex gap-4 self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            <div className="flex flex-col w-[65px] items-start gap-1 relative">
              <div className="relative self-stretch mt-[-1.00px] font-desktop-h5 font-[number:var(--desktop-h5-font-weight)] text-color-text-main text-[length:var(--desktop-h5-font-size)] tracking-[var(--desktop-h5-letter-spacing)] leading-[var(--desktop-h5-line-height)] [font-style:var(--desktop-h5-font-style)]">
                빠른 걷기
              </div>
              <div className="relative self-stretch font-desktop-p-sm font-[number:var(--desktop-p-sm-font-weight)] text-gray-700 text-[length:var(--desktop-p-sm-font-size)] tracking-[var(--desktop-p-sm-letter-spacing)] leading-[var(--desktop-p-sm-line-height)] [font-style:var(--desktop-p-sm-font-style)]">
                유산소 운동
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto]">
            <div className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-color-background-white rounded-[20px] shadow-floating">
              <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  <div className="relative w-fit font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main text-[length:var(--desktop-h6-font-size)] tracking-[var(--desktop-h6-letter-spacing)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap [font-style:var(--desktop-h6-font-style)]">
                    운동 방법
                  </div>
                </div>
                <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                  1. 머리를 들고 어깨를 편 채 허리를 곧게 유지합니다.
                </p>
                <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                  2. 발뒤꿈치부터 착지해 발바닥 전체로 밀어내며 걷습니다.
                </p>
                <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                  3. 팔을 약 90도로 굽혀 자연스럽게 흔듭니다.
                </p>
              </div>
              <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  <div className="relative w-fit font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main text-[length:var(--desktop-h6-font-size)] tracking-[var(--desktop-h6-letter-spacing)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap [font-style:var(--desktop-h6-font-style)]">
                    운동 시간
                  </div>
                </div>
                <div className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                  1회당 30분
                </div>
              </div>
            </div>
            <div className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-color-background-white rounded-[20px] shadow-floating">
              <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  <div className="w-fit text-[length:var(--desktop-h6-font-size)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap relative mt-[-1.00px] font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main tracking-[var(--desktop-h6-letter-spacing)] [font-style:var(--desktop-h6-font-style)]">
                    추가 팁
                  </div>
                </div>
                <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                  운동 효과를 극대화하기 위해 일정한 속도를 유지하세요.
                </p>
              </div>
              <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  <div className="w-fit text-[length:var(--desktop-h6-font-size)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap relative mt-[-1.00px] font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main tracking-[var(--desktop-h6-letter-spacing)] [font-style:var(--desktop-h6-font-style)]">
                    주요 효과
                  </div>
                </div>
                <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                  심혈관 건강 증진 및 체지방 감소
                </p>
              </div>
              <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                  <div className="w-fit text-[length:var(--desktop-h6-font-size)] leading-[var(--desktop-h6-line-height)] whitespace-nowrap relative mt-[-1.00px] font-desktop-h6 font-[number:var(--desktop-h6-font-weight)] text-color-text-main tracking-[var(--desktop-h6-letter-spacing)] [font-style:var(--desktop-h6-font-style)]">
                    주의 사항
                  </div>
                </div>
                <p className="relative w-fit font-desktop-p-md font-[number:var(--desktop-p-md-font-weight)] text-color-text-main-2 text-[length:var(--desktop-p-md-font-size)] tracking-[var(--desktop-p-md-letter-spacing)] leading-[var(--desktop-p-md-line-height)] whitespace-nowrap [font-style:var(--desktop-p-md-font-style)]">
                  발에 맞지 않거나 지지력이 부족한 신발은 부상의 위험을 높일 수 있어요!
                </p>
              </div>
            </div>
            <div className="flex px-10 py-6 self-stretch w-full flex-col items-start gap-6 relative flex-[0_0_auto] bg-color-background-white rounded-[20px] shadow-floating">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforDetailPage;

