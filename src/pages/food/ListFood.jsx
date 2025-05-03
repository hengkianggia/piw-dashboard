import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Tooltip,
    Paper,
} from "@mui/material";
import {
    Add as AddIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { mockFoods } from "../../utils/mockData";

const ListFood = () => {
    const navigate = useNavigate();
    const [foods, setFoods] = useState(mockFoods);

    // Delete food (mock)
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this food item?")) {
            setFoods(foods.filter((food) => food.id !== id));
        }
    };

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
                    Food List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/food/add")}
                >
                    Add New Food
                </Button>
            </Box>

            {/* Food List */}
            <Grid container spacing={3}>
                {foods.length > 0 ? (
                    foods.map((food) => (
                        <Grid item xs={12} md={6} lg={4} key={food.id}>
                            <Card
                                elevation={2}
                                sx={{
                                    borderRadius: 2,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 200,
                                        backgroundImage: `url(${food.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            {food.title}
                                        </Typography>
                                        <Box>
                                            <Tooltip title="View">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => navigate(`/food/${food.id}`)}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() =>
                                                        navigate(`/food/edit/${food.id}`)
                                                    }
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDelete(food.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        Price: ${food.price}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 2, minHeight: "4em" }}
                                    >
                                        {food.description.length > 100
                                            ? `${food.description.substring(0, 100)}...`
                                            : food.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
                            <Typography>No food items found.</Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default ListFood;
