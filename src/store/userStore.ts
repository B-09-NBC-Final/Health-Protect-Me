import { create } from 'zustand';

type UserState = {
  userId: string;
  email: string;
  profile_url: string;
  nickname: string;
  is_survey_done: boolean;
} | null;

type UserStoreState = {
  user: UserState;
  setUser: (user: Partial<NonNullable<UserState>> | null) => void;
  clearUser: () => void;
};

// Zustand 스토어 생성
export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (payload) =>
    set((state) => ({
      user: payload === null ? null : ({ ...state.user, ...payload } as UserState)
    })),
  clearUser: () => set({ user: null })
}));
