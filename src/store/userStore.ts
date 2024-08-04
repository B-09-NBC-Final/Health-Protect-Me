import { create } from 'zustand';

type UserState = {
  userId: string;
  height: number | null;
  weight: number | null;
  goal: string;
  nickname: string;
  profileImage: string;
  is_survey_done: boolean;
  email: string;
  profile_url: string;
};

type UserStoreState = {
  user: UserState | null;
  setUser: (user: Partial<UserState> | null) => void;
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
