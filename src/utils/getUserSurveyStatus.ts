import { createClient } from '@/supabase/server';

export const getUserSurveyStatus = async (authToken: string): Promise<boolean> => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('users')
    .select('is_survey_done')
    .eq('user_id', user?.id || '')
    .single();

  if (error) {
    console.error('Error fetching survey status:', error);
    return false;
  }

  return data.is_survey_done;
};
