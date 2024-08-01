'use client'
import React, { useState, useEffect } from 'react';
import { createClient } from '@/supabase/client';

const InforDetailPage = () => {
  // const [resultDiet, setResultDiet] = useState('');
  // const [resultExercise, setResultExercise] = useState('');
  // const [error, setError] = useState(null);
  // const [userId, setUserId] = useState('c11d5638-40f3-4b7d-8659-542c4b03ba82');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const supabase = createClient();
  //     const { data: userData, error: userError } = await supabase
  //       .from('information')
  //       .select('user_id')
  //       .eq('user_id', "c11d5638-40f3-4b7d-8659-542c4b03ba82")

  //     const { data: dietData, error: dietError } = await supabase
  //       .from('information')
  //       .select('result_diet')
  //       .eq('user_id', userId)
  //       .single()

  //     // Assuming you want a single row
  //     console.log(22, dietData);

  //     const { data: exerciseData, error: exerciseError } = await supabase
  //       .from('information')
  //       .select('result_exercise')
  //       .eq('user_id', userId)
  //       .single(); // Assuming you want a single row
  //     console.log(33, exerciseData);

  //     if (userData) setError(userError);
  //     if (dietError) setError(dietError);
  //     if (exerciseError) setError(exerciseError);

  //     if (userData) setUserId(userData.user_id);
  //     if (dietData) setResultDiet(dietData.result_diet);
  //     if (exerciseData) setResultExercise(exerciseData.result_exercise);
  //   };
  //   fetchData();
  // }, []);

  // const parseDiet = (dietString: string) => {
  //   if (!dietString) return null; // dietString이 undefined인 경우를 처리
  //   const sections = dietString.split('\n');
  //   const diet = {
  //     day: '',
  //     breakfast: { menu: '', ratio: '', calories: '' },
  //     lunch: { menu: '', ratio: '', calories: '' },
  //     dinner: { menu: '', ratio: '', calories: '' },
  //     totalCalories: ''
  //   };

  //   let currentMeal = null;

  //   sections.forEach((line) => {
  //     if (line.startsWith('@')) diet.day = line.substring(1).trim();
  //     else if (line.startsWith('#')) {
  //       currentMeal = diet.breakfast;
  //       if (line.startsWith('#?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
  //       else if (line.startsWith('#-')) currentMeal.menu += line.substring(1).trim() + '\n';
  //       else if (line.startsWith('#$')) currentMeal.ratio = line.substring(1).trim();
  //       else if (line.startsWith('#&')) currentMeal.calories = line.substring(1).trim();
  //     } else if (line.startsWith('^')) {
  //       currentMeal = diet.lunch;
  //       if (line.startsWith('^?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
  //       else if (line.startsWith('^-')) currentMeal.menu += line.substring(1).trim() + '\n';
  //       else if (line.startsWith('^$')) currentMeal.ratio = line.substring(1).trim();
  //       else if (line.startsWith('^&')) currentMeal.calories = line.substring(1).trim();
  //     } else if (line.startsWith('!')) {
  //       currentMeal = diet.dinner;
  //       if (line.startsWith('!?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
  //       else if (line.startsWith('!-')) currentMeal.menu += line.substring(1).trim() + '\n';
  //       else if (line.startsWith('!$')) currentMeal.ratio = line.substring(1).trim();
  //       else if (line.startsWith('!&')) currentMeal.calories = line.substring(1).trim();
  //     } else if (line.startsWith('*')) diet.totalCalories = line.substring(1).trim();
  //   });

  //   return diet;
  // };

  // const parseExercise = (exerciseString: string) => {
  //   if (!exerciseString) return null; // exerciseString이 undefined인 경우를 처리
  //   const [beforeTip, afterTip] = exerciseString.split('운동 팁:');
  //   return {
  //     beforeTip: beforeTip ? beforeTip.trim() : '',
  //     afterTip: afterTip ? '운동 팁: ' + afterTip.trim() : ''
  //   };
  // };

  // const diet = parseDiet(resultDiet);
  // const exercise = parseExercise(resultExercise);

  // if (error) return <div>Error: {error.message}</div>;

  return (
    // <div>
    //   <section>
    //     <h2>다이어트 계획 ({diet?.day})</h2>
    //     <div>
    //       <h3>아침</h3>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         메뉴: {diet?.breakfast.menu}
    //       </pre>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         탄단지 비율: {diet?.breakfast.ratio}
    //       </pre>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         칼로리: {diet?.breakfast.calories}
    //       </pre>
    //     </div>
    //     <div>
    //       <h3>점심</h3>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         메뉴: {diet?.lunch.menu}
    //         탄단지 비율: {diet?.lunch.ratio}
    //         칼로리: {diet?.lunch.calories}
    //       </pre>
    //     </div>
    //     <div>
    //       <h3>저녁</h3>
    //       <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //         메뉴: {diet?.dinner.menu}
    //         탄단지 비율: {diet?.dinner.ratio}
    //         칼로리: {diet?.dinner.calories}
    //       </pre>
    //     </div>
    //     <div>
    //       <h3>총 칼로리</h3>
    //       <p>{diet?.totalCalories}</p>
    //     </div>
    //   </section>
    //   <section>
    //     <h2>운동 계획</h2>
    //     <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //       {exercise?.beforeTip}
    //     </pre>
    //     <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
    //       {exercise?.afterTip}
    //     </pre>
    //   </section>
    // </div>
    <div>
      <div>
        <h1>오늘의 추천 식단</h1>
        <p>AI 분석을 바탕으로 매일 맞춤 식단을 추천해 드려요.</p>
      </div>
    </div>
  );
};

export default InforDetailPage;
