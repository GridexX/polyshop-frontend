import { SearchOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  kind: "product" | "order";
}

export const NotFoundError = ({ kind }: Props) => {
  return (
    <Box sx={{diplay: "flex", alignItems: "center"}}>
      
      <Typography variant="h5" color="error" component="div" sx={{ textAlign: "center" }}>
      <SearchOff fontSize="medium"/> Not Found
      </Typography>
      <Typography variant="caption" color="text.secondary" component="div" sx={{ textAlign: "center" }}>
        {`The ${kind} you are looking for does not exist`}
      </Typography>
      <Typography variant="caption" color="text.secondary" component="div" sx={{ textAlign: "center" }}>
        Return in a <Link to="/">safer place</Link>
      </Typography>
    </Box>
  );
};