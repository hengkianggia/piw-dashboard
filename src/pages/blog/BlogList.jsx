import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockBlogs } from '../../utils/mockData';

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(mockBlogs);
  
  // Delete blog (mock)
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Blog Posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/blogs/add')}
        >
          Add New Blog
        </Button>
      </Box>
      
      {/* Blog List */}
      <Grid container spacing={3}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Grid item xs={12} key={blog.id}>
              <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 0 }}>
                  <Grid container>
                    <Grid item xs={12} md={3}>
                      <Box
                        sx={{
                          height: '100%',
                          minHeight: 200,
                          backgroundImage: `url(${blog.coverImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Box sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h5" component="h2" gutterBottom>
                            {blog.title}
                          </Typography>
                          <Box>
                            <IconButton
                              color="primary"
                              onClick={() => navigate(`/blogs/${blog.id}`)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => navigate(`/blogs/edit/${blog.id}`)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(blog.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                          {blog.excerpt}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
              <Typography>No blogs found.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default BlogList;
