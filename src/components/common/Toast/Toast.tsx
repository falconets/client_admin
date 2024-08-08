
import usePositionedSnackbar from '@hooks/snackbar';
import { Snackbar, Stack, Typography } from '@mui/joy';

const Toast = () => {
      const {
            defaultPosition,
            open: isSnackbarOpen,
            title: snackbarTitle,
            message: snackbarMessage,
            type,
            handleClose,
          } = usePositionedSnackbar();
          
          
  return (
      <Snackbar
      anchorOrigin={{
        vertical: defaultPosition.vertical,
        horizontal: defaultPosition.horizontal,
      }}
      open={isSnackbarOpen}
      onClose={handleClose}
      key={defaultPosition.vertical + defaultPosition.horizontal}
      variant='soft'
      color={type}
      invertedColors
      sx={{
        zIndex: 10000
      }}
    >
        <Stack direction='column' spacing={2}>
        <Typography component="h2">{snackbarTitle}</Typography>
        <Typography>{snackbarMessage}</Typography>

        </Stack>
    </Snackbar>
  )
}

export default Toast