import { create } from 'zustand';

export const useProfileStore = create((set: any) => ({
  user: null,
  updateUser: (user: any) => set(() => ({ user })),
})) as any;
