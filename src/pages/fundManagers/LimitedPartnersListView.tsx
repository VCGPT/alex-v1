import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LimitedPartnerListCard from "../../components/LimitedPartnerListCard";
import { LimitedPartner } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { getFundLimitedPartners } from "../../services/api";

const LimitedPartnersListView: React.FC = () => {
  const [limitedPartners, setLimitedPartners] = useState<LimitedPartner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { fundId } = useParams<{ fundId: string }>();

  useEffect(() => {
    const fetchLimitedPartners = async () => {
      if (!fundId) {
        setError("Fund ID is required");
        setLoading(false);
        return;
      }

      try {
        const data = await getFundLimitedPartners(fundId);
        setLimitedPartners(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch limited partners. Please try again.");
        console.error("Error fetching limited partners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLimitedPartners();
  }, [fundId]);

  const handleAddNew = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(`/fundmanager-ai/funds/${fundId}/add-LP`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLimitedPartners = limitedPartners.filter((partner) =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ gap: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "28px",
              height: "36px",
            },
          }}
        />
        <Button
          onClick={handleAddNew}
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: "5px",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          Add New
        </Button>
      </Box>

      {filteredLimitedPartners.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          {searchQuery ? "No limited partners found matching your search." : "No limited partners found."}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredLimitedPartners.map((partner: LimitedPartner) => (
            <Grid item xs={12} key={partner._id}>
              <LimitedPartnerListCard limitedPartner={partner} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default LimitedPartnersListView; 