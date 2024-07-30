// 설문 입력지에 대한 정보 type
export type Step = '출생년도' | '성별' | '신장' | '체중' | '식단 목적';
export type Gender = '남' | '여';
export type DietGoal = '체중 감량' | '체중 유지' | '건강 식습관' | '체중 증량';

// 데이터 구조 type 지정
export type SurveyData = {
  birthYear: string;
  gender: Gender | null;
  height: string;
  weight: string;
  dietGoal: DietGoal | null;
};

