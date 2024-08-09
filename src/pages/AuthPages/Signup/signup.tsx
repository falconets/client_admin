import React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  formLabelClasses,
  GlobalStyles,
  IconButton,
  Input,
  LinearProgress,
  Link,
  Select,
  Stack,
  Typography,
  Option,
  Avatar,
  Badge,
} from "@mui/joy";
import { BadgeRounded, FileUploadOutlined } from "@mui/icons-material/";
import { FormEvent, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import mutations from "@api/mutations";
import { uploadImage, deleteImage } from "@api/firebase"
import ModeToggle from "@common/ModeToggle";
import usePositionedSnackbar from "@hooks/snackbar";
import { useNavigate } from 'react-router-dom';
import Routes from '@route';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent?: HTMLInputElement;
  avatar: HTMLInputElement;
  first_name: HTMLInputElement;
  last_name: HTMLInputElement;
  gender: HTMLSelectElement;
  phone_number: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Signup: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [image, setImage] = useState<File>()
  const [gender, setGender] = useState<string>('')
  const [password, setPassword] = useState<string>("");
  const [signUp, { error, loading }] = useMutation(mutations.signup);
  const { showSnackbar } = usePositionedSnackbar()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
  
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
      firstName: formElements.first_name.value,
      lastName: formElements.last_name.value,
      phoneNumber: formElements.phone_number.value,
      avatar: null,
      gender: gender,
      isEmailVerified: false,
      type: 'admin',
      busCompanyId: '2',
    };
  
    if (data.email.trim() !== "" && data.password.trim() !== "") {
      let upload: string | null = null;
  
      if (image) {
        try{
          upload = await uploadImage(image as File);
        }catch(err){console.log('error',err)}
      }

      try{
        signUp({
          variables: { ...data, avatar: upload },
        }).then((res) => {
          console.log(res.data)
          showSnackbar({
            title:"Notification",
            message: "You have successfully signed up!",
            type:"success"
          })
          navigate(Routes.signin)
        });
      }catch(err){
        await deleteImage(upload as string)
        console.log(err)
      }
  
    } else {
      console.log("failed to sign in");
    }
  };
  

  const handleBadgeClick = () => {
    if(fileInputRef.current) {
      fileInputRef.current.click()}
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      const file = event.target?.files[0];
      setAvatarUrl(URL.createObjectURL(file))
      setImage(file)
    }

  };

  const handleGenderChange = (
    _event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setGender(newValue as string);
  };

  if (error) {
    console.log(error);
  }
  return (
    <>
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          {" "}
          <Box
            id="header-signin"
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRounded />
              </IconButton>
              <Typography level="title-lg">BusHub</Typography>
            </Box>
            <ModeToggle />
          </Box>
          <Box
            id="main-signin"
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            {" "}
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h3">Sign Up</Typography>
                <Typography level="body-sm">
                  Already have an account?{" "}
                  <Link onClick={() => navigate(Routes.signin)} level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Badge 
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    variant='outlined'
                    badgeContent={<FileUploadOutlined sx={{cursor: 'pointer'}} onClick={handleBadgeClick} />}
                    badgeInset="14%"
                    sx={{'--Badge-paddingX': '0px'}}
                    >
                    <Avatar sx={{ alignSelf: "center", height:100, width:100 }} variant="soft" src={avatarUrl} />
                    <input ref={fileInputRef} name='avatar' accept="image/*" type="file" style={{display:'none'}} onChange={(evt)=>handleFileChange(evt)} />
                  </Badge>
                </Box>
                <Stack
                  spacing={{ xs: 2, sm: "2%" }}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="center"
                >
                  <FormControl
                    sx={{ width: { xs: "100%", sm: "49%" } }}
                    required
                  >
                    <FormLabel>FirstName</FormLabel>
                    <Input type="text" name="first_name" />
                  </FormControl>
                  <FormControl
                    sx={{ width: { xs: "100%", sm: "49%" } }}
                    required
                  >
                    <FormLabel>LastName</FormLabel>
                    <Input type="text" name="last_name" />
                  </FormControl>
                </Stack>

                <Stack
                  spacing={{ xs: 2, sm: "2%" }}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="center"
                >
                  <FormControl
                    sx={{ width: { xs: "100%", sm: "50%" } }}
                    required
                  >
                    <FormLabel>Gender</FormLabel>
                    <Select
                      placeholder="choose gender"
                      name="gender"
                      sx={{ minWidth: 200 }}
                      value={gender}
                      onChange={handleGenderChange}
                      required
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{ width: { xs: "100%", sm: "49%" } }}
                    required
                  >
                    <FormLabel>Contact</FormLabel>
                    <Input type="text" name="phone_number" />
                  </FormControl>
                </Stack>

                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Stack
                    spacing={0.5}
                    sx={{
                      "--hue": Math.min(password.length * 12, 120),
                    }}
                  >
                    <Input
                      type="password"
                      name="password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <LinearProgress
                      determinate
                      size="sm"
                      value={Math.min((password.length * 100) / 8, 100)}
                      sx={{
                        bgcolor: "background.level3",
                        color: "hsl(var(--hue) 80% 40%)",
                      }}
                    />
                    <Typography
                      level="body-xs"
                      sx={{
                        alignSelf: "flex-end",
                        color: "hsl(var(--hue) 80% 30%)",
                      }}
                    >
                      {password.length < 3 && "Very weak"}
                      {password.length >= 3 && password.length < 6 && "Weak"}
                      {password.length >= 6 && password.length < 10 && "Strong"}
                      {password.length >= 10 && "Very strong"}
                    </Typography>
                  </Stack>
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
            <Typography level="body-xs" textAlign="center">
              © BusHub {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
           "url(https://res.cloudinary.com/dqtrhmkxd/image/upload/v1704442027/Designer_3_fxkagh.png)", 
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://res.cloudinary.com/dqtrhmkxd/image/upload/v1704442554/Designer_5_eew3nq.png)",
          },
        })}
      />
    </>
  );
};

export default Signup;


