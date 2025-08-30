import { Button } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Header from "../Header/Header";

export const Home: React.FC = () => {
  const [me, setMe] = useState({});

  const REACT_APP_JWT_AUTH_ENDPOINT = process.env.REACT_APP_JWT_AUTH_ENDPOINT;

  if (!REACT_APP_JWT_AUTH_ENDPOINT) {
    throw new Error("Missing REACT_APP_JWT_AUTH_ENDPOINT");
  }

  const handleGetMe = async () => {
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      };
      const response = await axios.get<AxiosResponse>(
        REACT_APP_JWT_AUTH_ENDPOINT + "/users/me",
        { headers }
      );

      console.log(response.data);

      if(response){
        setMe(response.data);
      }

    } catch (error: any) {
      // TODO: FIX ANY TYPE
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <Header/>
      <div>Success!</div>
      <div>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleGetMe}
        >
          GET ME!
        </Button>
      </div>
      <div>
        <p>{JSON.stringify(me)}</p>
      </div>
    </div>
  );
};
