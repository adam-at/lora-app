import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserProfile from "../UserProfile";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function Login() {
  const [jwt, setJwt] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);


  const URL = "http://203.162.235.53:8080/api/internal/login";
 
    const postData = (user) => {
      const strUser = JSON.stringify(user);
      const header ={
        body: strUser,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      };
        fetch(URL, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                if(response.error){
                  alert(response.error);
                }else{
                  setJwt(response.jwt);
                  
                }
            })
 
    };

    
    useEffect(() => {
        if(jwt){
        UserProfile.setJwt(jwt);
        console.log(UserProfile.getJwt());
        getData();
        }
    }, [jwt]);

    useEffect(() => {
      if(loggedIn){
      navigateToDashboard();
      setTimeout(10);
      window.location.reload();
      setLoggedIn(false);
      }
  }, [loggedIn]);

    const navigate = useNavigate();

    const navigateToDashboard = () => {
        navigate('/dashboard');
      };



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {"email": data.get('email'), "password": data.get('password')};
    postData(user);   
    
  };


  

  const URLprofile = "http://203.162.235.53:8080/api/internal/profile";
  const getData = () => {
    const header ={
        headers: {
            Accept: "application/json",
            "Grpc-Metadata-Authorization": "Bearer " + UserProfile.getJwt()
          }
    };
      fetch(URLprofile, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              if(response.error){
                alert(response.error);
              }else{
                UserProfile.setUser(response.user);
                UserProfile.setOrganizations(response.organizations);
                setLoggedIn(true);
              }
          })

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username/Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In 
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}