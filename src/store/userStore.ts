import { create } from 'zustand';

type UserState = {
  userId: string;
  nickname: string;
  profile_url: string | null;
  email: string;
  height: number | null;
  weight: number | null;
  goal: string;
  is_survey_done: boolean;
};

type UserStoreState = {
  user: UserState | null;
  setUser: (user: Partial<UserState> | null) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (payload) =>
    set((state) => ({
      user: payload === null ? null : ({ ...state.user, ...payload } as UserState)
    })),
  clearUser: () => set({ user: null })
}));
