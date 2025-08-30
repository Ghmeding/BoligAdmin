import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ILoginResponse } from "../../models/responses";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const REACT_APP_JWT_AUTH_ENDPOINT = process.env.REACT_APP_JWT_AUTH_ENDPOINT;

  if (!REACT_APP_JWT_AUTH_ENDPOINT) {
    throw new Error("Missing REACT_APP_JWT_AUTH_ENDPOINT");
  }

  const headers = {
    "Content-Type": "application/json",
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post<ILoginResponse>(
        REACT_APP_JWT_AUTH_ENDPOINT + "/auth/login",
        {
          "email": email,
          "password": password,
        },
        { headers }
      );

      const jwtToken = response.data.token;

      if (response.data.token) {
        sessionStorage.setItem("jwtToken", jwtToken);
        navigate("/home");
      } else {
        throw new Error("token is null");
      }
    } catch (error) {
      setErrorMsg("Registration Failed: " + error);
    }
  };

  return (
  <Container maxWidth={false} disableGutters>
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      {/* Left side with image */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/houseIcon.png"
          alt="Home"
          style={{ maxWidth: "80%", height: "auto" }}
        />
      </Box>

      {/* Right side with login form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 4,
        }}
      >
        <CssBaseline />
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
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
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link to="/register">Ikke oprettet endnu? - Register her</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  </Container>
  );
};

export default Login;
