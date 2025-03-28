import { Box, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { IconButton } from "@mui/material";
import { Document } from "../types";
import FileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

const DocumentCard: React.FC<{ document: Document }> = ({ document }) => {
  const handleDelete = () => {
    console.log('file deleted');
  };

  return (
    <Card sx={{ 
      height: '200px', // Fixed height for consistent card size
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }
    }}>
      <CardContent sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: 2,
        '&:last-child': { pb: 2 }, // Override Material-UI's default padding
      }}>
        {/* File name at the top */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {document.file instanceof File ? document.file.name : 'Untitled Document'}
        </Typography>

        {/* Centered icon */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FileIcon sx={{ 
            fontSize: 48,
            color: 'black'
          }} />
        </Box>

        {/* Bottom actions row */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 'auto'
        }}>
          {/* Delete button */}
          <IconButton 
            size="small"
            onClick={handleDelete}
            sx={{
              color: 'black',
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            <DeleteIcon />
          </IconButton>

          {/* Download button */}
          <IconButton 
            size="small" 
            color="primary"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            <DownloadIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};        

export default DocumentCard;