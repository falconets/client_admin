import { Box, Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Link } from "react-router-dom";

type ownprops = {
  subject: string;
  value: string;
};

const LabelCard: FC<ownprops> = ({ subject, value }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography component="h3">{subject}</Typography>

          <Link to="#">Show report</Link>
        </Box>

        <CardContent>
          <Typography gutterBottom sx={{ fontSize: 24 }}>
            {value}
          </Typography>

          <Typography variant="body2"></Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LabelCard;
