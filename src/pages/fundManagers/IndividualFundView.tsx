import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Fund } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack, Edit } from "@mui/icons-material";
import DocumentsListView from "./DocumentsListView";
import InvestmentsList from "./InvestmentsListView";
import LimitedPartnersListView from "./LimitedPartnersListView";
import FundUpdatesListView from "./FundUpdatesListView";
import { getFundById } from "../../services/api";

const filterTabs = [
  { label: "Portfolio", value: "portfolio" },
  { label: "Limited Partners", value: "limited-partners" },
  { label: "Updates", value: "updates" },
  { label: "Documents", value: "documents" },
];

const IndividualFundView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("portfolio");
  const [fund, setFund] = useState<Fund>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fundId } = useParams<{ fundId: string }>();

  const handleEdit = () => {
    navigate(`/fundmanager-ai/funds/${fundId}/edit`);
  }

  useEffect(() => {
    const fetchFund = async () => {
      try {
        if (fundId) {
          const data = await getFundById(fundId);
          setFund(data);
        } else {
          console.error('Fund ID is required');
        }
      } catch (err) {
        setError('Failed to fetch fund. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      } 
    };
    fetchFund();
  }, [fundId]);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  
  

  if (!fund) {
    return <div>Fund not found</div>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto", width: "min-content"}}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          textAlign: "left",
          color: "gray",
          display: "flex",
          justifyContent: "flex-start",
          ml:"-12px",
          "&:hover": {
            color: "black",
          },
        }}
      >
                <ArrowBack fontSize="small" sx={{mr:"3px",}}/>
        Back
      </Button>

      <Typography
        variant="h5"
        sx={{ mt: 3, mb: 2, fontWeight: 500, textAlign: "left" }}
      >
        Fund
      </Typography>

      <Card
        sx={{
          p: 3,
          width: "500px",
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {fund?.name}
            </Typography>
            <IconButton size="small" sx={{ color: "black" }} onClick={handleEdit}>
              <Edit />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Legal Entity:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fund?.legalEntity}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Description:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fund?.description}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Fund Size:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fund?.fundSize}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <Typography variant="body2">Estimated Value:</Typography>
              <Typography variant="body2" color="text.secondary">
                {fund?.estimatedValue}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          mb: 3,
          minHeight: "36px",
          "& .MuiTabs-flexContainer": {
            gap: 1,
          },
          "& .MuiTab-root": {
            minHeight: "32px",
            padding: "6px 16px",
            borderRadius: "16px",
            fontSize: "0.875rem",
            textTransform: "none",
            border: "1px solid",
            borderColor: "rgba(0, 0, 0, 0.2)",
            "&.Mui-selected": {
              color:'black',
              border: "1px solid",
              borderColor: "rgba(0, 0, 0, 0.8)",
              backgroundColor: "transparent",
            },
          },
        }}
      >
        {filterTabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            disableRipple
          />
        ))}
      </Tabs>
      {selectedTab === "portfolio" && (
        <InvestmentsList showFilters={false} showHeader={false} showFundChip={false} />
      )}
      {selectedTab === "limited-partners" && <LimitedPartnersListView />}
      {selectedTab === "updates" && (
        <FundUpdatesListView />
      )}
      {selectedTab === "documents" && (
        <DocumentsListView
          showFilters={false}
          showUploadNew={true}
          showHeader={false}
        />
      )}
    </Box>
  );
};

export default IndividualFundView;
