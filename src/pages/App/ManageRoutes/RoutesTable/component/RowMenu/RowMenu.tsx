import useBusRoutes from "@hooks/useBusRoutes";
import { MoreHorizRounded } from "@mui/icons-material";
import {
  Divider,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";

function RowMenu({ routeId }: { routeId: string }) {
  const { deleteBusRoute } = useBusRoutes();
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRounded />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <Divider />
        <MenuItem color="danger" onClick={() => deleteBusRoute(routeId)}>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default RowMenu;
