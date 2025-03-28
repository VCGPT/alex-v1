import { Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FundUpdate } from "../../types";
import UpdateListCard from "../../components/UpdateListCard";
import { Field, Form } from "formik";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { createFundUpdate, getFundFundUpdates } from "../../services/api";


const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};

const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
});

const FundUpdatesListView: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [updates, setUpdates] = useState<FundUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fundId } = useParams<{ fundId: string }>();
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const fetchUpdates = async () => {
        if (!fundId) {
          setError("Fund ID is required");
          setLoading(false);
          return;
        }
  
        try {
          const data = await getFundFundUpdates(fundId);
          setUpdates(data);
          setError(null);
        } catch (err) {
          setError("Failed to fetch limited partners. Please try again.");
          console.error("Error fetching limited partners:", err);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
          fetchUpdates();
    }, [fundId]);


    const handleSubmit = async (values: { description: string }) => {
        setFormLoading(true);
        try{
            await createFundUpdate({...values, fundId});
            handleClose();
        } catch (err) {
            setError("Failed to create fund update. Please try again.");
            console.error("Error creating fund update:", err);
        } finally {
            await fetchUpdates()
            setFormLoading(false);
            setOpen(false)
        }
    };

    if (loading) {
        return (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        );
      }
    

    return (
        <Box sx={{ gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <TextField
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "28px",
                            height: "36px",
                        },
                    }}
                />
                <Button
                    onClick={handleOpen}
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

            {updates.map((update: FundUpdate) => (
                <UpdateListCard key={update.id} update={update} />
            ))}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-fund-update-modal"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" sx={{ mb: 3, color: "black" }}>
                        Create Fund Update
                    </Typography>

                    <Formik
                        initialValues={{ description: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    name="description"
                                    as={TextField}
                                    label="Description"
                                    multiline
                                    rows={5}
                                    fullWidth
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                    sx={{ mb: 3 }}
                                />

                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            bgcolor: "black",
                                            color: "white",
                                            "&:hover": {
                                                bgcolor: "rgba(0, 0, 0, 0.8)",
                                            },
                                        }}
                                    >
                                        Post
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </Box>
    );
};

export default FundUpdatesListView;