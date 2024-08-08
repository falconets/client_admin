import { create } from 'zustand';

interface userInfos {
  avatar: string;
  bus_company_id: number;
  created_at: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  is_email_verified: boolean;
  last_name: string;
  phone_number: string;
  type: string;
  updated_at: string;
}

interface userStoreProps {
  userInfos: userInfos | null;
  // eslint-disable-next-line no-unused-vars
  setUserInfo: (infos: userInfos) => void;
}

const userStore = create<userStoreProps>((set) => ({
  userInfos: null,
  setUserInfo: (infos) => set({ userInfos: { ...infos } }),
}));

export default userStore;
