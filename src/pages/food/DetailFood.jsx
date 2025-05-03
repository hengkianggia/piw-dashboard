import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    IconButton,
    Tooltip,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { mockFoods } from "../../utils/mockData";

const DetailFood = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            const foundFood = mockFoods.find((food) => food.id === id);
            if (foundFood) {
                setFood(foundFood);
            }
            setLoading(false);
        }, 800);
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this food item?")) {
            // Simulate deletion
            setTimeout(() => {
                navigate("/food");
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

    if (!food) {
        return (
            <Box>
                <Typography variant="h5" color="error">
                    Food item not found
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/food")}
                    sx={{ mt: 2 }}
                >
                    Back to Food List
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
                    Food Details
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/food")}
                        sx={{ mr: 2 }}
                    >
                        Back to Food List
                    </Button>
                    <Tooltip title="Edit Food">
                        <IconButton
                            color="secondary"
                            onClick={() => navigate(`/food/edit/${food.id}`)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Food">
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
                        backgroundImage: `url(${food.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <Box sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        {food.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Price: ${food.price}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {food.description}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default DetailFood;
