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
