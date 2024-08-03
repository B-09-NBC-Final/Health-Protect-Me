import { create } from 'zustand';

type UserState = {
  userId: string;
  email: string;
  profile_url: string;
  is_survey_done: boolean;
} | null;

type UserType = {
  user: UserState;
};

type SetUserState = {
  setUser: (user: Partial<NonNullable<UserState>> | null) => void;
};

// Zustand 스토어 생성
export const useUserStore = create<UserType & SetUserState>((set) => ({
  user: null,
  setUser: (payload) => set((state) => ({
    user: payload === null ? null : { ...state.user, ...payload } as UserState
  }))
}));