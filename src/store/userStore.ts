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
   
  setUserInfo: (infos: userInfos) => void;
}

const userStore = create<userStoreProps>((set):userStoreProps => ({
  userInfos: null,
  setUserInfo: (infos) => set({ userInfos: { ...infos } }),
}));

export default userStore;
