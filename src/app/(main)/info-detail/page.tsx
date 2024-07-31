'use client'
import React, { useState } from 'react';

const InforDetailPage = () => {
  const [dayData, setDayData] = useState(null);
  const [error, setError] = useState(null);

  const handleClickAPICall = async () => {
    try {
      const response = await fetch("/api/gpt");
      if (!response.ok) {
        throw new Error('API 요청에 실패했습니다.');
      }
      const content = await response.json();
      console.log("content", content);
      return content.data; // API 응답 데이터가 content.data에 있다고 가정
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setError(error.message);
    }
  };

  const fetchData = async () => {
    const content = await handleClickAPICall();
    if (content) {
      const daysData = content.split('\n@');
      const firstDayData = daysData[0]; // 첫 번째 일차 데이터만 가져옴
      console.log("일주일치 데이터:", daysData);
      console.log("첫날 데이터:", firstDayData);
      if (!firstDayData) {
        console.error("firstDayData가 정의되지 않았습니다.");
        setError("첫 번째 일차 데이터가 없습니다.");
        return;
      }

      const [mealsData, exerciseData] = firstDayData.split('~추천운동');
      console.log("식단 데이터:", mealsData);
      console.log("운동데이터:", exerciseData);
      const mealDetails = parseMeals(mealsData.trim());

      console.log("식단 디테일:", mealDetails);

      setDayData({
        meals: mealDetails,
        exercise: exerciseData.trim()
      });
    }
  };

  const parseMeals = (mealsData) => {
    const mealDetails = {
      breakfast: { menu: '', ratio: '', calories: '' },
      lunch: { menu: '', ratio: '', calories: '' },
      dinner: { menu: '', ratio: '', calories: '' }
    };

    console.log("mealDetails:", mealDetails);

    const sections = mealsData.split('\n');
    console.log("섹션:", sections);
    sections.forEach(section => {
      if (section.startsWith('#')) {
        if (section.includes('$')) {
          const [menu, ratio] = section.split('$');
          mealDetails.breakfast.menu += menu.replace(/^#[^\w]*|^[^#]/g, '').trim() + '\n';
          mealDetails.breakfast.ratio += '$' + ratio.trim() + '\n';
        } else if (section.includes('&')) {
          const [menu, calories] = section.split('&');
          mealDetails.breakfast.menu += menu.replace(/^#[^\w]*|^[^#]/g, '').trim() + '\n';
          mealDetails.breakfast.calories += '&' + calories.trim() + '\n';
        } else {
          mealDetails.breakfast.menu += section.replace(/^#[^\w]*|^[^#]/g, '').trim() + '\n';
        }
      } else if (section.startsWith('^')) {
        if (section.includes('$')) {
          const [menu, ratio] = section.split('$');
          mealDetails.lunch.menu += menu.replace(/^\^[^\w]*|^[^\^]/g, '').trim() + '\n';
          mealDetails.lunch.ratio += '$' + ratio.trim() + '\n';
        } else if (section.includes('&')) {
          const [menu, calories] = section.split('&');
          mealDetails.lunch.menu += menu.replace(/^\^[^\w]*|^[^\^]/g, '').trim() + '\n';
          mealDetails.lunch.calories += '&' + calories.trim() + '\n';
        } else {
          mealDetails.lunch.menu += section.replace(/^\^[^\w]*|^[^\^]/g, '').trim() + '\n';
        }
      } else if (section.startsWith('!')) {
        if (section.includes('$')) {
          const [menu, ratio] = section.split('$');
          mealDetails.dinner.menu += menu.replace(/^![^\w]*|^[^!]/g, '').trim() + '\n';
          mealDetails.dinner.ratio += '$' + ratio.trim() + '\n';
        } else if (section.includes('&')) {
          const [menu, calories] = section.split('&');
          mealDetails.dinner.menu += menu.replace(/^![^\w]*|^[^!]/g, '').trim() + '\n';
          mealDetails.dinner.calories += '&' + calories.trim() + '\n';
        } else {
          mealDetails.dinner.menu += section.replace(/^![^\w]*|^[^!]/g, '').trim() + '\n';
        }
      }
    });

    return mealDetails;
  };

  return (
    <div>
      <button onClick={fetchData}>API 호출</button>
      {error && (
        <div style={{ color: 'red' }}>
          <p>오류: {error}</p>
        </div>
      )}
      {dayData && (
        <div>
          <div>
            <h2>식단</h2>
            <div>
              <h3>아침</h3>
              <pre>{dayData.meals.breakfast.menu}</pre>
              <pre>{dayData.meals.breakfast.ratio}</pre>
              <pre>{dayData.meals.breakfast.calories}</pre>
            </div>
            <div>
              <h3>점심</h3>
              <pre>{dayData.meals.lunch.menu}</pre>
              <pre>{dayData.meals.lunch.ratio}</pre>
              <pre>{dayData.meals.lunch.calories}</pre>
            </div>
            <div>
              <h3>저녁</h3>
              <pre>{dayData.meals.dinner.menu}</pre>
              <pre>{dayData.meals.dinner.ratio}</pre>
              <pre>{dayData.meals.dinner.calories}</pre>
            </div>
          </div>
          <div>
            <h2>추천 운동</h2>
            <pre>{dayData.exercise}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default InforDetailPage;
