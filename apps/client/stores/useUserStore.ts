import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export { create } from 'zustand';

type IUser = {
  userId: string;
  isLoggedIn: boolean;
};

type IUserStore = {
  logout: () => void;
  setUserId: (userId: IUser['userId']) => void;
} & IUser;

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      userId: '',
      isLoggedIn: false,
      setUserId: (userId: IUser['userId']) =>
        set(() => ({
          userId,
          isLoggedIn: true,
        })),
      logout: () => set(() => ({ userId: '', isLoggedIn: false })),
    }),

    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        userId: state.userId,
      }),
    }
  )
);
