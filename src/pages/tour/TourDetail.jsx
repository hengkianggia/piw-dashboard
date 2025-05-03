import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    Chip,
    IconButton,
    Tooltip,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { mockTours } from "../../utils/mockData";

const TourDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            const foundTour = mockTours.find((tour) => tour.id === id);
            if (foundTour) {
                setTour(foundTour);
            }
            setLoading(false);
        }, 800);
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this tour?")) {
            // Simulate deletion
            setTimeout(() => {
                navigate("/tours");
            }, 500);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "400px",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!tour) {
        return (
            <Box>
                <Typography variant="h5" color="error">
                    Tour not found
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/tours")}
                    sx={{ mt: 2 }}
                >
                    Back to Tours
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Tour Details
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/tours")}
                        sx={{ mr: 2 }}
                    >
                        Back to Tours
                    </Button>
                    <Tooltip title="Edit Tour">
                        <IconButton
                            color="secondary"
                            onClick={() => navigate(`/tours/edit/${tour.id}`)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Tour">
                        <IconButton color="error" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Paper
                elevation={3}
                sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        height: 300,
                        backgroundImage: `url(${tour.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <Box sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        {tour.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Price: ${tour.price}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {tour.tags && tour.tags.map((tag) => (
                            <Chip key={tag} label={tag} color="primary" variant="outlined" />
                        ))}
                    </Box>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {tour.description}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default TourDetail;
