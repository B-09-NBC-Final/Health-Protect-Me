import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const { data, error: userError } = await supabase
    .from('users')
    .select('is_survey_done')
    .eq('user_id', user.id)
    .single();
  console.log('data', data);
  if (userError || !data) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const isSurveyDone = data.is_survey_done;
  const redirectUrl = isSurveyDone ? `${origin}` : `${origin}/info`;

  return NextResponse.redirect(redirectUrl);
}
