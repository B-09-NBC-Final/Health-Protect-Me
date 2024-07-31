export type Step = '출생년도' | '성별' | '신장' | '체중' | '식단 목적';
export type Gender = '남' | '여' | null;
export type DietGoal = '체중 감량' | '체중 유지' | '건강 식습관' | '체중 증량' | null;

export type SurveyData = {
  birthYear: string;
  gender: Gender;
  height: string;
  weight: string;
  purpose: DietGoal;
};