import { create } from 'zustand';

type UserState = {
  userId: string | '';
  email: string | undefined;
};

type UserType = {
  user: UserState;
};

type SetUserState = {
  setUser: (user: UserState) => void;
};

// Zustand 스토어 생성
export const useUserStore = create<UserType & SetUserState>((set) => ({
  user: { userId: '', email: undefined, nickname: null, profileUrl: '' },
  setUser: (payload) => set({ user: payload })
}));
