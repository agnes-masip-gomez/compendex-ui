import { Container, Grid, Box, Button, Typography, Paper} from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from "../components/Auth/UserContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const Profile = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    console.log(user)

    //TODO: Make API call that returns how many projects a User participates in.

    useEffect(() => {
     
    });

    return (
      <div className="container-app">
        <div className='titleRow'>
        <p className="title">Profile</p>
        <div class="vl"></div>
        <div>
            <p className="counter"> Fullname: {user.fullname} </p>
            <p className="counter"> E-mail: {user.email} </p>
            <p className="counter"> Admin rights: {user.admin ? 'Yes' : 'No'}</p>
        </div>
        </div>
        <Button startIcon={<KeyboardBackspaceIcon/>} sx={{gridRow: '1', gridColumn: '9/10'}}>
              <Link to={`/dashboard/${user._id}`} className="Link" style={{ textDecoration: 'none'}}>
                  Back
              </Link>
          </Button>
        

{/* 
          <Box >
            <div className='titleRow'>
            <p className="title">Training Sessions</p>
            <p className="counter"> N Items</p>

            <Link to={`/project`} className="title-button" style={{ textDecoration: 'none' }}>
                 + Create New Training Session
            </Link>
            </div>
            
            <hr class="divider"></hr>
            <Box display="flex" ml="auto" className="right-navbar">
            
            
            
        </Box>
          
            <Box>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <p>TBD </p>
                </Paper>
              </Grid>
            </Box> */}
            
          {/* </Box>  */}
        
      </div>
  
    
)};