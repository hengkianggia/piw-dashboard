import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Box,
    Typography,
    Link,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5555/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Failed to sign in");
            }

            // Optionally handle response data
            // const data = await response.json();

            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                Sign In
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.2 }}
            >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
            </Box>

            <Box sx={{ mt: 3, bgcolor: "background.default", p: 2, borderRadius: 1 }}>
                <Typography variant="caption" display="block" gutterBottom align="center">
                    Demo credentials: admin@example.com / password
                </Typography>
            </Box>
        </Box>
    );
};

export default SignIn;
