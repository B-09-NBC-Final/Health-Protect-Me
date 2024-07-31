'use client'
import React, { useState } from 'react';
import { createClient } from '@/supabase/client';

const InforDetailPage = () => {
  // const supabase = createClient();
  // const { data: information, error } = await supabase
  //   .from('information')
  //   .select('result_diet')


  // const { data: information, error } = await supabase
  //   .from('information')
  //   .select('result_exercise')


  const result_diet = `@5일차 
#아침: 
#?메뉴: 
#-요거트 (플레인) + 그래놀라 + 제철 과일 
#-달걀 2개 + 통밀 식빵 1장 
#$탄수화물, 단백질, 지방 비율: 50:30:20 
#&칼로리: 약 700 kcal 
^점심: 
^?메뉴: 
^-돼지고기 불고기 (200g) + 쌈채소 
^-현미밥 반 공기 
^-김치 한 접시 
^$탄수화물, 단백질, 지방 비율: 45:35:20 
^&칼로리: 약 800 kcal 
!저녁: 
!?메뉴: 
!-해산물 파스타 (새우, 오징어 등) + 올리브 오일 소스 
!-브로콜리, 미니 당근 구이 
!$탄수화물, 단백질, 지방 비율: 50:30:20 
!&칼로리: 약 750 kcal 
*총 칼로리: 약 2250 kcal`;

  const result_exercise = `~추천운동
운동종류: 턱걸이
운동방법:

바벨을 어깨 너비로 잡고 매달립니다.
팔을 굽혀 턱이 바벨을 넘도록 합니다.
다시 팔을 펴고 위치로 돌아갑니다.
운동 팁: 몸이 흔들리지 않도록 주의하세요.
운동 횟수 및 시간: 3세트, 8회씩, 세트 간 1분 휴식
운동의 영향: 등 근육과 팔 근육 발달
주의사항: 손목에 부상 위험이 없도록 주의하세요.`;

  const parseDiet = (dietString) => {
    const sections = dietString.split('\n');
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

  const parseExercise = (exerciseString) => {
    const [beforeTip, afterTip] = exerciseString.split('운동 팁:');
    return {
      beforeTip: beforeTip.trim(),
      afterTip: '운동 팁: ' + afterTip.trim()
    };
  };

  const diet = parseDiet(result_diet);
  const exercise = parseExercise(result_exercise);

  return (
    <div>
      <section>
        <h2>다이어트 계획 ({diet.day})</h2>
        <div>
          <h3>아침</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            메뉴: {diet.breakfast.menu}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            탄단지 비율: {diet.breakfast.ratio}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            칼로리: {diet.breakfast.calories}
          </pre>
        </div>
        <div>
          <h3>점심</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            메뉴: {diet.lunch.menu}
            탄단지 비율: {diet.lunch.ratio}
            칼로리: {diet.lunch.calories}
          </pre>
        </div>
        <div>
          <h3>저녁</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            메뉴: {diet.dinner.menu}
            탄단지 비율: {diet.dinner.ratio}
            칼로리: {diet.dinner.calories}
          </pre>
        </div>
        <div>
          <h3>총 칼로리</h3>
          <p>{diet.totalCalories}</p>
        </div>
      </section>
      <section>
        <h2>운동 계획</h2>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {exercise.beforeTip}
        </pre>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {exercise.afterTip}
        </pre>
      </section>
    </div>
  );
};

export default InforDetailPage;
