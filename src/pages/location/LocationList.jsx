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
import { mockLocations } from "../../utils/mockData";

const LocationList = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState(mockLocations);

  // Delete location (mock)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter((location) => location.id !== id));
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
          Location List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/location/add")}
        >
          Add New Location
        </Button>
      </Box>

      {locations.length > 0 ? (
        <Grid container spacing={3}>
          {locations.map((location) => (
            <Grid item xs={12} md={6} lg={4} key={location.id}>
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
                    backgroundImage: `url(${location.image})`,
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
                      {location.title}
                    </Typography>
                    <Box>
                      <Tooltip title="View">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/location/${location.id}`)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => navigate(`/location/edit/${location.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(location.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, minHeight: "4em" }}>
                    {location.description.length > 100
                      ? `${location.description.substring(0, 100)}...`
                      : location.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
          <Typography>No locations found.</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default LocationList;
