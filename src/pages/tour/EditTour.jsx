import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    CircularProgress,
    Alert,
    Chip,
} from "@mui/material";
import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon,
    Add as AddIcon,
} from "@mui/icons-material";
import { mockTours } from "../../utils/mockData";

const EditTour = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form state
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        // Fetch tour data
        const tour = mockTours.find((tour) => tour.id === id);
        if (tour) {
            setTitle(tour.title);
            setPrice(tour.price);
            setTags(tour.tags || []);
            setImagePreview(tour.image);
            setContent(tour.description);
        }
    }, [id]);

    // Handle tag addition
    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setTagInput("");
        }
    };

    // Handle tag deletion
    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !price || tags.length === 0 || (!imageFile && !imagePreview) || !content) {
            setError("Please fill out all required fields");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccess("Tour updated successfully");
            setTimeout(() => navigate("/tours"), 1000);
        } catch (err) {
            setError("Failed to update tour");
        } finally {
            setLoading(false);
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
                    Edit Tour
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/tours")}
                >
                    Back to Tours
                </Button>
            </Box>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Tour Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                variant="outlined"
                                inputProps={{ min: 0, step: "0.01" }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Add Tag"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <Button onClick={handleAddTag} startIcon={<AddIcon />}>
                                            Add
                                        </Button>
                                    ),
                                }}
                                helperText="Press Enter or click Add to add a tag"
                            />
                            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
                                {tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={() => handleDeleteTag(tag)}
                                        color="primary"
                                        variant="outlined"
                                        sx={{ mr: 0.5, mb: 0.5 }}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                variant="outlined"
                                multiline
                                rows={6}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 30,
                            }}
                        >
                            {imagePreview && (
                                <Box
                                    component="img"
                                    src={imagePreview}
                                    alt="Image Preview"
                                    sx={{
                                        mt: 2,
                                        maxWidth: "50%",
                                    }}
                                />
                            )}
                            <Button
                                variant="contained"
                                component="label"
                                style={{
                                    width: "fit-content",
                                }}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    variant="outlined"
                                    sx={{ mr: 2 }}
                                    onClick={() => navigate("/tours")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    startIcon={
                                        loading ? (
                                            <CircularProgress size={20} color="inherit" />
                                        ) : (
                                            <SaveIcon />
                                        )
                                    }
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default EditTour;
