import React from "react";
import { Box, Typography } from "@mui/material";
import { UserProfile } from "@clerk/clerk-react";

const SettingsPage: React.FC = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 500,
        }}
      >
        Settings
      </Typography>

      <UserProfile
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              margin: "0 auto",
            },
          },
        }}
      />
    </Box>
  );
};

export default SettingsPage;
