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
import { mockLocations } from "../../utils/mockData";

const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch location data from mockLocations by id
    setLoading(true);
    const location = mockLocations.find((loc) => loc.id === id);
    if (location) {
      setLocation(location);
    }
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      // Simulate deletion
      setTimeout(() => {
        navigate("/location");
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

  if (!location) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          Location not found
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/location")}
          sx={{ mt: 2 }}
        >
          Back to Locations
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
          Location Details
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/location")}
            sx={{ mr: 2 }}
          >
            Back to Locations
          </Button>
          <EditIcon
            color="secondary"
            sx={{ cursor: "pointer", mr: 1 }}
            onClick={() => navigate(`/location/edit/${location.id}`)}
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
            backgroundImage: `url(${location.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Box sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {location.title}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {location.description}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LocationDetail;
