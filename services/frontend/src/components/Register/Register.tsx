import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const REACT_APP_JWT_AUTH_ENDPOINT = process.env.REACT_APP_JWT_AUTH_ENDPOINT;

  if (!REACT_APP_JWT_AUTH_ENDPOINT) {
    throw new Error("Missing REACT_APP_JWT_AUTH_ENDPOINT");
  }

  const headers = {
    "Content-Type": "application/json"
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post<AxiosResponse>(
        REACT_APP_JWT_AUTH_ENDPOINT + "/auth/signup",
        {
            "username": name,
            "password": password,
            "email": email
        },
        { headers }
      );
      navigate('/verify');
    } catch (error: any) {
        console.error("Registration Failed: " + error.response);
    }
  };
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Register</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Grid
            container
            justifyContent={"flex-end"}
          >
            <Grid>
              <Link to="/register">Don't have an account? Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
