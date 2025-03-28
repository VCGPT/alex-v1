import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Tab, Tabs, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DocumentCard from '../../components/DocumentCard';
import { getUserDocuments } from '../../services/api';
import { Document } from '../../types';
import UploadDocumentModal from '../../components/UploadDocumentModal';

interface DocumentsListViewProps {
  // documents?: Document[];
  showUploadNew?: boolean;
  showFilters?: boolean;
  showHeader?: boolean;
}

const DocumentsListView: React.FC<DocumentsListViewProps> = ({ showUploadNew, showFilters, showHeader }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const filterTabs = [
    { label: "All", value: "all" },
    { label: "Investment", value: "investment" },
    { label: "Fund", value: "fund" },
  ];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getUserDocuments();
        // Transform the data to match the Document type
        const transformedDocuments: Document[] = data.map((doc: any) => ({
          id: doc._id,
          file: doc.file,
          companyName: doc.companyName,
          description: doc.description,
          uploadDate: doc.uploadDate
        }));
        setDocuments(transformedDocuments);
      } catch (err) {
        setError('Failed to fetch documents. Please try again later.');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleModalClose = () => {
    setIsUploadModalOpen(false);
    // Refresh documents list
    setDocuments([]);
  }
  // Calculate total documents
  const totalDocuments = documents.length;
  
  // Calculate total documents by type
  const investmentDocuments = documents.filter(doc => doc.companyName.includes('Investment')).length;
  const fundDocuments = documents.filter(doc => doc.companyName.includes('Fund')).length;

  const handleAddNew = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(`/fundmanager-ai/new-document`);
  };

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* Document Statistics */}
      {showHeader && <Box sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 500, textAlign: 'left' }}>
          {totalDocuments} Documents
        </Typography>
      </Box>}

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "28px",
              height: "36px",
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.10)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 0, 0, 0.12)",
              },
            },
          }}
        />
        {showUploadNew && (
          <Button
            variant="contained"
            onClick={() => setIsUploadModalOpen(true)}
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: "2px",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.8)",
              },
            }}
          >
            Upload New
          </Button>
        )}
      </Box>

      {/* Filter Tabs */}
      {showFilters && <Tabs
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
              border: "1px solid",
              borderColor: "rgba(0, 0, 0, 0.8)",
              backgroundColor: "transparent",
              color:'black'
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
      </Tabs>}

      {/* Document Grid */}
      {documents.length > 0 ? <Grid container spacing={3}>
        { documents.map((document, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DocumentCard document={document} />
          </Grid>
        ))}
      </Grid> : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Typography variant="body1">No documents found</Typography>
      </Box>}

      {/* Upload Modal */}
      <UploadDocumentModal
        open={isUploadModalOpen}
        onClose={handleModalClose}
        onDocumentUploaded={() => {
          // Refresh documents list
          setDocuments([]);
        }}
      />
    </Box>
  );
};

export default DocumentsListView; 