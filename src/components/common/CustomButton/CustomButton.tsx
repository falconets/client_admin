import { FC } from "react";
import Button from "@mui/joy/Button";
import { SxProps } from "@mui/material";
import { Typography } from "@mui/joy";

type ownprops={
    label: string,
    onClick?: ()=> void, 
    sx?: SxProps, 
    labelSx?: SxProps, 
    disabled?: boolean, 
  };

const CustomButton: FC<ownprops> = ({ label, onClick, sx, labelSx, disabled = false }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        ...sx, // allows custom styles such as height, width, color, etc.
      }}
      disabled={disabled}
    >
      <Typography sx={{ ...labelSx }}>{label}</Typography> {/* Customizable label */}
    </Button>
  );
};




export default CustomButton;
