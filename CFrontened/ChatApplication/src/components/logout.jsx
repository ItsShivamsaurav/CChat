import { useUser } from "./context";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="primary"
        sx={{ marginRight: 2 }}
      >
        logout
      </Button>
    </>
  );
};

export default LogoutButton;
