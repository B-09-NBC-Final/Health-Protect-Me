import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserState = {
  userId: string | null;
  email: string | null;
  nickname: string | null;
  profileUrl: string | null;
};

// Zustand 스토어 생성
export const useUserStore = create(
  (set) => ({
    user: { userId: null, email: null, nickname: null, profileUrl: '' },
    setUser: ({ userId, email, nickname, profileUrl }: UserState) => set({ userId, email, nickname, profileUrl })
  })

  // devtools(
  //   persist(
  //     (set) => ({
  //       userId: null,
  //       email: null,
  //       nickname: null,
  //       profileUrl: '',
  //       setUser: (userId, email, nickname, profileUrl) => set({ userId, email, nickname, profileUrl })
  //     }),
  //     {
  //       name: 'user-storage'
  //     }
  //   )
  // )
);
