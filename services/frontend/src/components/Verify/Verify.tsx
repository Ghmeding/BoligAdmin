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
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const REACT_APP_JWT_AUTH_ENDPOINT = process.env.REACT_APP_JWT_AUTH_ENDPOINT;

  if (!REACT_APP_JWT_AUTH_ENDPOINT) {
    throw new Error("Missing REACT_APP_JWT_AUTH_ENDPOINT");
  }

  const headers = {
    "Content-Type": "application/json",
  };

  const handleVerification = async () => {
    try {
      const response = await axios.post<AxiosResponse>(
        REACT_APP_JWT_AUTH_ENDPOINT + "/auth/verify",
        {
            "email": "meding97@gmail.com",
            "verificationCode": verificationCode
        },
        { headers }
      );

    //   navigate("/verify");
    } catch (error: any) {
      console.error("Registration Failed: " + error.response.data);
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
        <Typography variant="h5">Verify Account</Typography>
        <p>Please enter verification code</p>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="verificationCode"
            label="Verification Code"
            name="verificationCode"
            autoFocus
            value={verificationCode}
            onChange={(e: any) => setVerificationCode(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleVerification}
          >
            Verify
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Verify;
