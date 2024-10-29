import React, { useState } from 'react';
import useBusRoutes from "@hooks/useBusRoutes";
import { MoreHorizRounded } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

function RowMenu({ routeId }: { routeId: string }) {
  const { deleteBusRoute } = useBusRoutes();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? 'row-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizRounded />
      </IconButton>
      <Menu
        id="row-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'row-menu-button',
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            deleteBusRoute(routeId);
            handleClose();
          }}
          sx={{ color: 'error.main' }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default RowMenu;
