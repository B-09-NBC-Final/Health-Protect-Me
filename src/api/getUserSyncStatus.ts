import { createClient } from '@/supabase/server';

export const getUserSyncStatus = async (authToken: string): Promise<boolean> => {
    const supabase = createClient();

    // 현재 인증된 사용자 정보 가져오기
    const {
        data: { user }
    } = await supabase.auth.getUser();

    // information 테이블에서 sync_user_data 상태 가져오기
    const { data, error } = await supabase
        .from('information')
        .select('sync_user_data')
        .eq('user_id', user?.id || '')
        .single();

    // 오류 발생 시 false 반환
    if (error) {
        console.error('Error fetching sync user data status:', error);
        return false;
    }

    // sync_user_data 상태 반환
    return data.sync_user_data;
};
