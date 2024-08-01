import { InfomationTable } from "./supabase";

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

export type FullSurveyData = Pick<SurveyData, 'birthYear' | 'gender' | 'height' | 'weight' | 'purpose'>;
export type InformationInsertDataType = Pick<InfomationTable, 'year_of_birth' | 'gender' | 'height' | 'purpose' | 'weight'>;

export type UserType = {
  userId?: string;
  is_survey_done?: boolean;
  // 필요한 다른 사용자 속성들...
}

export type UserStore = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}