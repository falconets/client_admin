import { Box } from "@mui/joy";
import * as S from "./styled";
import MapView from "@common/MapView";

const Dashboard = () => {
  return (
    <S.Container>
      <Box>Dashboard goes here</Box>
      <Box>
        <MapView />
      </Box>
    </S.Container>
  );
};

export default Dashboard;
