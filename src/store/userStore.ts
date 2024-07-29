import { createClient } from '@/supabase/client';
import { create } from 'zustand';

type UserState = {
  userId: string | '';
  email: string | undefined;
} | null;

type UserType = {
  user: UserState;
};

type SetUserState = {
  setUser: (user: UserState) => void;
};

// Zustand 스토어 생성
export const useUserStore = create<UserType & SetUserState>((set) => ({
  user: null,
  setUser: (payload) => set({ user: payload })
}));
const supabase = createClient();

supabase.auth.onAuthStateChange((event, session) => {
  const userStore = useUserStore.getState();
  if (session) {
    userStore.setUser({
      userId: session.user.id,
      email: session.user.email
    });
  } else {
    userStore.setUser(null);
  }
});

(async () => {
  const { data } = await supabase.auth.getSession();
  const userStore = useUserStore.getState();
  if (data.session) {
    userStore.setUser({
      userId: data.session.user.id,
      email: data.session.user.email
    });
  }
})();
