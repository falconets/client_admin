import { create, StoreApi, UseBoundStore } from 'zustand'

interface props{
      signin: boolean,
      signup: boolean,
      error: boolean,
      // eslint-disable-next-line no-unused-vars
      navigateTo: (page: 'signin' | 'signup' | 'error') => void
}

const useAuthPageStore:  UseBoundStore<StoreApi<props>> = create((set)=>({
      signin: true,
      signup: false,
      error: false,
      navigateTo: (page) => set(()=>({
            signin: page === 'signin',
            signup: page === 'signup',
            error: page === 'error'
      }))
}))

export default useAuthPageStore