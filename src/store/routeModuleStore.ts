import { create } from 'zustand';

interface routeState{
      open: boolean;
}

interface props {
  state: routeState
  handleClose: ()=> void
  handleOpen: ()=> void
}

const routeModuleStore = create<props>((set) => ({
  state: {
      open: false
  },
  handleClose: () => set(state => ({state:{...state, open: false}})),
  handleOpen: () => set(state => ({state:{...state, open: true}})),
}));

export default routeModuleStore;
