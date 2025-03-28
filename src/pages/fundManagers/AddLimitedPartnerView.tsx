import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
} from "@mui/material";
import {createLimitedPartner, getLimitedPartnerById, updateLimitedPartner} from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddLimitedPartnerView: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
   name:'',
   websiteUrl:'',
   email:'',
   description:'',
   legalEntity:'',
  });
  const { fundId } = useParams<{ fundId: string }>();
  const { limitedPartnerId } = useParams<{ limitedPartnerId: string }>();
  const editing = limitedPartnerId ? true : false;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      // setError(null);
    // Handle form submission here
    try {
      // Transform the form data to match the backend expectations
      const limitedPartnerData = {...formData,fundId};

      await createLimitedPartner(limitedPartnerData);
      navigate(-1);
    } catch (err) {
      // setError('Failed to create investment. Please try again.');
      console.error('Error creating investment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);

    if (!limitedPartnerId) {
      setError('Limited partner ID is required');
      return;
    }

    try {
      const limitedPartnerData = {...formData,fundId};

      await updateLimitedPartner(limitedPartnerId, limitedPartnerData);
      navigate(-1);
    } catch (err) {
      setError('Failed to update limited partner. Please try again.');
      console.error('Error updating limited partner:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (limitedPartnerId) {
      const fetchLimitedPartner = async () => {
        const limitedPartner = await getLimitedPartnerById(limitedPartnerId);
        setFormData(limitedPartner);
      };
      fetchLimitedPartner();
    }
  }, [limitedPartnerId, editing]);
  

  return (
    <Box sx={{ p: 3, textAlign: "left" }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ color: "text.secondary", mb: 2 }}
      >
        Back
      </Button>

      <Typography variant="h6" component="h1" sx={{ mb: 3 }}>
        {editing ? 'Edit' : 'Add'} Limited Partner
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select from existing</InputLabel>
        <Select label="Select from existing">
          <MenuItem value="">None</MenuItem>
          {/* Add existing limited partners here */}
        </Select>
      </FormControl>

      <Typography variant="body1" sx={{ textAlign: "center", mb: 3 }}>
        or
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Invite new
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
        <form onSubmit={handleSubmit}>
            
              
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      label="LP name"
                      name="name"
                      fullWidth
                      onChange={handleChange}
                      value={formData.name}
                      // error={touched.name && Boolean(errors.name)}
                      // helperText={touched.name && errors.name}
                    />

                    <TextField
                      name="websiteUrl"
                      onChange={handleChange}
                      value={formData.websiteUrl}
                      label="LP website or linkedin"
                      fullWidth
                      // error={touched.websiteUrl && Boolean(errors.websiteUrl)}
                      // helperText={touched.websiteUrl && errors.websiteUrl}
                    />
                  </Box>
                  <TextField
                    name="email"
                    onChange={handleChange}
                    value={formData.email}                    
                    label="LP email"
                    fullWidth
                    // error={touched.email && Boolean(errors.email)}
                    // helperText={touched.email && errors.email}
                  />

                  <TextField
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    label="Description"
                    fullWidth
                    multiline
                    rows={2}
                    // error={touched.description && Boolean(errors.description)}
                    // helperText={touched.description && errors.description}
                  />

                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                  >
                    <Button
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        mt: 2,
                        color: "black",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      // type="submit"
                      onClick={editing ? handleUpdate : handleSubmit}
                      variant="contained"
                      sx={{
                        bgcolor: "black",
                        color: "white",
                        mt: 2,
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.8)",
                        },
                      }}
                    >
                       {loading ? <CircularProgress size={24} /> : editing ? 'Update' : 'Add New'}
                    </Button>
                  </Box>
                </Box>
              </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddLimitedPartnerView;
