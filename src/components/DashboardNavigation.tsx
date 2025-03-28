import { Box, Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const DashboardNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const sidebarButtons = [
    { label: "App marketplace", value: "marketplace" },
    { label: "Saved apps", value: "saved" },
    { label: "Settings", value: "settings" },
    { label: "Logout", value: "logout" },
  ];

  const [selectedButton, setSelectedButton] = useState("marketplace");

  const handleButtonClick = async (value: string) => {
    setSelectedButton(value);
    if(value === "marketplace") {
      navigate("/");
      return;
    }
    if (value === "settings") {
      navigate("/settings");
      return;
    }
    if (value === "logout") {
      try {
        await signOut();
        navigate("/");
      } catch (error) {
        console.error("Error signing out:", error);
      }
      return;
    }
  };

  return (
    <Box
      sx={{
        width: 250,
        minWidth:'200px',
        p: 3,
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src="/assets/predictiveLogoBlack.svg"
        alt="Predictive Logo"
        sx={{
          width: "80%",
          height: "auto",
          mb: 4,
          alignSelf: "center",
        }}
      />

      {/* Vertical Button Group */}
      <ButtonGroup
        orientation="vertical"
        sx={{
          "& .MuiButton-root": {
            border: "none",
            justifyContent: "flex-start",
            px: 2,
            py: 1.5,
            textTransform: "none",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        }}
      >
        {sidebarButtons.map((button) => (
          <Button
            key={button.value}
            onClick={() => handleButtonClick(button.value)}
            sx={{
              color:
                selectedButton === button.value ? "black" : "text.secondary",
              fontWeight: selectedButton === button.value ? 500 : 400,
            }}
          >
            {button.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default DashboardNavigation;
