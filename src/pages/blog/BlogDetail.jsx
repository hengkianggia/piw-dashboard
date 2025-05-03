import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";
import { mockBlogs } from "../../utils/mockData";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            const foundBlog = mockBlogs.find((blog) => blog.id === id);
            if (foundBlog) {
                setBlog(foundBlog);
            }
            setLoading(false);
        }, 800);
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            // Simulate deletion
            setTimeout(() => {
                navigate("/blogs");
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

    if (!blog) {
        return (
            <Box>
                <Typography variant="h5" color="error">
                    Blog post not found
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/blogs")}
                    sx={{ mt: 2 }}
                >
                    Back to Blogs
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
                    Blog Details
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/blogs")}
                        sx={{ mr: 2 }}
                    >
                        Back to Blogs
                    </Button>
                    <EditIcon
                        color="secondary"
                        sx={{ cursor: "pointer", mr: 1 }}
                        onClick={() => navigate(`/blogs/edit/${blog.id}`)}
                    />
                    <DeleteIcon
                        color="error"
                        sx={{ cursor: "pointer" }}
                        onClick={handleDelete}
                    />
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
                        backgroundImage: `url(${blog.coverImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <Box sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        {blog.title}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {blog.excerpt}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default BlogDetail;
