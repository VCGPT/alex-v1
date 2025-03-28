import { Box, Card, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { FundUpdate } from "../types";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useRef, useEffect } from "react";

interface UpdateListCardProps {
  update: FundUpdate;
}

const UpdateListCard: React.FC<UpdateListCardProps> = ({ update }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const height = descriptionRef.current.scrollHeight;
      setShowReadMore(height > lineHeight * 3);
    }
  }, [update.description]);

  const handleCardClick = () => {
    console.log("Card clicked");
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        p: 2,
        border: "1px solid",
        borderColor: "grey.200",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "fit-content",
        }}
      >
        {/* <Typography variant="subtitle1" sx={{ fontWeight: 500, flex: 1 }}>
            {update.}
          </Typography> */}
        <Typography variant="body2">LP Update</Typography>
        <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
        <Typography variant="body2" color="text.secondary">
          {new Date(update.datePosted).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Typography
          ref={descriptionRef}
          align="left"
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "none" : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {update.description}
        </Typography>
        {showReadMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
            <Button
              onClick={handleReadMoreClick}
              endIcon={
                isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
              sx={{
                color: "text.secondary",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {isExpanded ? "Close" : "Read more"}
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default UpdateListCard;
