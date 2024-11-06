import { Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import router from "../Routes";
import { authenticatedVar } from "../../constants/authenticated";
import { useReactiveVar } from "@apollo/client";

const Branding = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  const onNavigateHandler = () => {
    if (authenticated) {
      router.navigate("/");
    } else {
      router.navigate("/login");
    }
  };

  return (
    <>
      <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => onNavigateHandler}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          cursor: "pointer",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Chatter
      </Typography>
    </>
  );
};

export default Branding;
