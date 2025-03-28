import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { LimitedPartner } from "../types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

interface LimitedPartnerListCardProps {
  limitedPartner: LimitedPartner;
}

const LimitedPartnerListCard: React.FC<LimitedPartnerListCardProps> = ({
  limitedPartner,
}) => {
  const navigate = useNavigate();
  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
        return;
    }
    navigate(`/fundmanager-ai/limited-partners/${limitedPartner._id}`);
};

  return (
    <Card
    onClick={handleCardClick}
      sx={{
          height: "70px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px:2,
          cursor: "pointer",
        border: "1px solid",
          borderColor: "grey.200",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }}
    >

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {limitedPartner.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {limitedPartner.email}
          </Typography>
        </Box>
        <ArrowForwardIcon color="disabled" />
      
    </Card>
  );
};

export default LimitedPartnerListCard;
