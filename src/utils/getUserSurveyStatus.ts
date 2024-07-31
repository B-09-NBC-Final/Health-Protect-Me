import { createClient } from '@/supabase/server';

export const getUserSurveyStatus = async (authToken: string): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('users').select('is_survey_done').eq('auth_token', authToken).single();

  if (error) {
    console.error('Error fetching survey status:', error);
    return false;
  }

  return data.is_survey_done;
};
