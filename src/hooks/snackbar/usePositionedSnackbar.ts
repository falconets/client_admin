import {create} from 'zustand';
import { SnackbarOrigin } from '@mui/joy/Snackbar';

interface PositionedSnackbarState{
  open: boolean;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'primary' | 'neutral';
}

interface UsePositionedSnackbarProps extends PositionedSnackbarState {
  defaultPosition: SnackbarOrigin;
  autoHideDuration?: number; // auto-hide duration in milliseconds
}

interface PositionedSnackbarStore extends UsePositionedSnackbarProps {
  // eslint-disable-next-line no-unused-vars
  showSnackbar: (options: {
    title: string;
    message: string;
    type: 'success' | 'warning' | 'danger' | 'primary' | 'neutral';
    position?: SnackbarOrigin;
  }) => void;
  handleClose: () => void;
}

const usePositionedSnackbar = create<PositionedSnackbarStore>(
  (set, get) => ({
    open: false,
    title: '',
    message: '',
    type: 'success',
    defaultPosition: { vertical: 'top', horizontal: 'center' },
    autoHideDuration: 10000,
    showSnackbar: ({ title, message, type, position }) => {
      const newPosition = position || get().defaultPosition;
      set((state) => ({
            ...state,
            open: true,
            title,
            message,
            type,
            ...newPosition,
          }));
    },
    handleClose: () => {
      set((state) => ({ ...state, open: false }));
    },
  })
);

usePositionedSnackbar.subscribe(
  (state) => {
    if (state.open) {
      const timeoutId = setTimeout(() => {
        usePositionedSnackbar.getState().handleClose();
      }, state.autoHideDuration || 20000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }
);

export default usePositionedSnackbar;
