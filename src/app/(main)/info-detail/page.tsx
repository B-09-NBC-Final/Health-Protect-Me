// 'use client'
// import React, { useState, useEffect } from 'react';
// import { createClient } from '@/supabase/client';

<<<<<<< HEAD
// const InforDetailPage = () => {
//   const [resultDiet, setResultDiet] = useState('');
//   const [resultExercise, setResultExercise] = useState('');
//   const [error, setError] = useState(null);
=======
const InforDetailPage = () => {
  
  const [dayData, setDayData] = useState(null);
  const [error, setError] = useState(null);
>>>>>>> 61e593a2a954b3f801fb84146e1db1829d95fb27

//   useEffect(() => {
//     const fetchData = async () => {
//       const supabase = createClient();

//       const { data: dietData, error: dietError } = await supabase
//         .from('information')
//         .select('result_diet')
//         .single(); // Assuming you want a single row

//       const { data: exerciseData, error: exerciseError } = await supabase
//         .from('information')
//         .select('result_exercise')
//         .single(); // Assuming you want a single row

//       if (dietError) setError(dietError);
//       if (exerciseError) setError(exerciseError);

//       if (dietData) setResultDiet(dietData.result_diet);
//       if (exerciseData) setResultExercise(exerciseData.result_exercise);
//     };

//     fetchData();
//   }, []);

//   const parseDiet = (dietString) => {
//     const sections = dietString.split('\n');
//     const diet = {
//       day: '',
//       breakfast: { menu: '', ratio: '', calories: '' },
//       lunch: { menu: '', ratio: '', calories: '' },
//       dinner: { menu: '', ratio: '', calories: '' },
//       totalCalories: ''
//     };

//     let currentMeal = null;

//     sections.forEach((line) => {
//       if (line.startsWith('@')) diet.day = line.substring(1).trim();
//       else if (line.startsWith('#')) {
//         currentMeal = diet.breakfast;
//         if (line.startsWith('#?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
//         else if (line.startsWith('#-')) currentMeal.menu += line.substring(1).trim() + '\n';
//         else if (line.startsWith('#$')) currentMeal.ratio = line.substring(1).trim();
//         else if (line.startsWith('#&')) currentMeal.calories = line.substring(1).trim();
//       } else if (line.startsWith('^')) {
//         currentMeal = diet.lunch;
//         if (line.startsWith('^?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
//         else if (line.startsWith('^-')) currentMeal.menu += line.substring(1).trim() + '\n';
//         else if (line.startsWith('^$')) currentMeal.ratio = line.substring(1).trim();
//         else if (line.startsWith('^&')) currentMeal.calories = line.substring(1).trim();
//       } else if (line.startsWith('!')) {
//         currentMeal = diet.dinner;
//         if (line.startsWith('!?메뉴:')) currentMeal.menu += line.substring(7).trim() + '\n';
//         else if (line.startsWith('!-')) currentMeal.menu += line.substring(1).trim() + '\n';
//         else if (line.startsWith('!$')) currentMeal.ratio = line.substring(1).trim();
//         else if (line.startsWith('!&')) currentMeal.calories = line.substring(1).trim();
//       } else if (line.startsWith('*')) diet.totalCalories = line.substring(1).trim();
//     });

//     return diet;
//   };

//   const parseExercise = (exerciseString) => {
//     const [beforeTip, afterTip] = exerciseString.split('운동 팁:');
//     return {
//       beforeTip: beforeTip.trim(),
//       afterTip: '운동 팁: ' + afterTip.trim()
//     };
//   };

//   const diet = parseDiet(resultDiet);
//   const exercise = parseExercise(resultExercise);

//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <section>
//         <h2>다이어트 계획 ({diet.day})</h2>
//         <div>
//           <h3>아침</h3>
//           <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//             메뉴: {diet.breakfast.menu}
//           </pre>
//           <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//             탄단지 비율: {diet.breakfast.ratio}
//           </pre>
//           <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//             칼로리: {diet.breakfast.calories}
//           </pre>
//         </div>
//         <div>
//           <h3>점심</h3>
//           <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//             메뉴: {diet.lunch.menu}
//             탄단지 비율: {diet.lunch.ratio}
//             칼로리: {diet.lunch.calories}
//           </pre>
//         </div>
//         <div>
//           <h3>저녁</h3>
//           <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//             메뉴: {diet.dinner.menu}
//             탄단지 비율: {diet.dinner.ratio}
//             칼로리: {diet.dinner.calories}
//           </pre>
//         </div>
//         <div>
//           <h3>총 칼로리</h3>
//           <p>{diet.totalCalories}</p>
//         </div>
//       </section>
//       <section>
//         <h2>운동 계획</h2>
//         <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//           {exercise.beforeTip}
//         </pre>
//         <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//           {exercise.afterTip}
//         </pre>
//       </section>
//     </div>
//   );
// };

// export default InforDetailPage;
