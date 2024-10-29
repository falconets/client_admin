import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GlobalStyles,
  IconButton,
  Input,
  LinearProgress,
  Link,
  Select,
  Stack,
  Typography,
  Avatar,
  Badge,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { BadgeRounded, FileUploadOutlined } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import mutations from '@api/mutations';
import { uploadImage, deleteImage } from '@api/firebase';
import ModeToggle from '@common/ModeToggle';
import usePositionedSnackbar from '@hooks/snackbar';
import Routes from '@route';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  gender: yup.string().required('Gender is required'),
  phone_number: yup.string().required('Phone number is required'),
});

const Signup: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [image, setImage] = useState<File>();
  const [signUp, { error, loading }] = useMutation(mutations.signup);
  const { showSnackbar } = usePositionedSnackbar();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      gender: '',
      phone_number: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        ...values,
        avatar: null,
        isEmailVerified: false,
        type: 'admin',
        busCompanyId: '1',
      };

      let upload: string | null = null;

      if (image) {
        try {
          upload = await uploadImage(image as File);
        } catch (err) {
          console.log('error', err);
        }
      }

      try {
        signUp({
          variables: { ...data, avatar: upload },
        }).then((res) => {
          console.log(res.data);
          showSnackbar({
            title: 'Notification',
            message: 'You have successfully signed up!',
            type: 'success',
          });
          navigate(Routes.signin);
        });
      } catch (err) {
        await deleteImage(upload as string);
        console.log(err);
      }
    },
  });

  const handleBadgeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatarUrl(URL.createObjectURL(file));
      setImage(file);
    }
  };

  if (error) {
    console.log(error);
  }

  return (
    <>
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px',
            '--Cover-width': '50vw',
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: 'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: 'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
            px: 2,
          }}
        >
          <Box
            id="header-signin"
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRounded />
              </IconButton>
              <Typography variant="h5">BusHub</Typography>
            </Box>
            <ModeToggle />
          </Box>
          <Box
            id="main-signin"
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography variant="h3">Sign Up</Typography>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link onClick={() => navigate(Routes.signin)} variant="subtitle1">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={formik.handleSubmit} method="post" encType="multipart/form-data">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Badge
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="outlined"
                    badgeContent={<FileUploadOutlined sx={{ cursor: 'pointer' }} onClick={handleBadgeClick} />}
                    badgeInset="14%"
                    sx={{ '--Badge-paddingX': '0px' }}
                  >
                    <Avatar sx={{ alignSelf: 'center', height: 100, width: 100 }} variant="soft" src={avatarUrl} />
                    <input
                      ref={fileInputRef}
                      name="avatar"
                      accept="image/*"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </Badge>
                </Box>
                <Stack
                  spacing={{ xs: 2, sm: '2%' }}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="center"
                >
                  <FormControl sx={{ width: { xs: '100%', sm: '49%' } }} error={formik.touched.first_name && Boolean(formik.errors.first_name)} required>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText>{formik.touched.first_name && formik.errors.first_name}</FormHelperText>
                  </FormControl>
                  <FormControl sx={{ width: { xs: '100%', sm: '49%' } }} error={formik.touched.last_name && Boolean(formik.errors.last_name)} required>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText>{formik.touched.last_name && formik.errors.last_name}</FormHelperText>
                  </FormControl>
                </Stack>

                <Stack
                  spacing={{ xs: 2, sm: '2%' }}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="center"
                >
                  <FormControl sx={{ width: { xs: '100%', sm: '50%' } }} error={formik.touched.gender && Boolean(formik.errors.gender)} required>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      placeholder="Choose gender"
                      name="gender"
                      sx={{ minWidth: 200 }}
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                    <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                  </FormControl>
                  <FormControl sx={{ width: { xs: '100%', sm: '49%' } }} error={formik.touched.phone_number && Boolean(formik.errors.phone_number)} required>
                    <FormLabel>Contact</FormLabel>
                    <Input
                      type="text"
                      name="phone_number"
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText>{formik.touched.phone_number && formik.errors.phone_number}</FormHelperText>
                  </FormControl>
                </Stack>

                <FormControl error={formik.touched.email && Boolean(formik.errors.email)} required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
                </FormControl>
                <FormControl error={formik.touched.password && Boolean(formik.errors.password)} required>
                  <FormLabel>Password</FormLabel>
                  <Stack
                    spacing={0.5}
                    sx={{
                      '--hue': Math.min(formik.values.password.length * 12, 120),
                    }}
                  >
                    <Input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((formik.values.password.length * 100) / 8, 100)}
                      sx={{
                        bgcolor: 'background.level3',
                        color: 'hsl(var(--hue) 80% 40%)',
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        alignSelf: 'flex-end',
                        color: 'hsl(var(--hue) 80% 30%)',
                      }}
                    >
                      {formik.values.password.length < 3 && 'Very weak'}
                      {formik.values.password.length >= 3 && formik.values.password.length < 6 && 'Weak'}
                      {formik.values.password.length >= 6 && formik.values.password.length < 10 && 'Strong'}
                      {formik.values.password.length >= 10 && 'Very strong'}
                    </Typography>
                  </Stack>
                  <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" loading={loading} fullWidth>
                    Sign up
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography variant="body2" textAlign="center">
              © BusHub {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
          transition: 'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(https://res.cloudinary.com/dqtrhmkxd/image/upload/v1704442027/Designer_3_fxkagh.png)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: 'url(https://res.cloudinary.com/dqtrhmkxd/image/upload/v1704442554/Designer_5_eew3nq.png)',
          },
        })}
      />
    </>
  );
};

export default Signup;


