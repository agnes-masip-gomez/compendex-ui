import { Container, Grid, Box, Button, Typography, Paper} from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../components/Auth/UserContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { fetchUserData } from '../services/user_service';

export const Profile = () => {
  const [uid, setUid] = useState("");
    const [profileUser, setProfile] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    console.log(user)

    //TODO: Make API call that returns how many projects a User participates in.

    useEffect(() => {
      const fetchData = async () => {
        const uid = localStorage.getItem("userId");
        await setUid(uid);
        fetchUserData(uid).then(data => setProfile(data));
      
    };
    fetchData()
  
    }, []);

    return (
      <div className="container-app">
        <div className='titleRow'>
        <p className="title">Profile</p>
        <div class="vl"></div>
        <div>
            <p className="counter"> Fullname: {profileUser.fullname} </p>
            <p className="counter"> E-mail: {profileUser.email} </p>
            <p className="counter"> Admin rights: {profileUser.admin ? 'Yes' : 'No'}</p>
        </div>
        </div>
        <Button startIcon={<KeyboardBackspaceIcon/>} sx={{gridRow: '1', gridColumn: '9/10'}}>
              <Link to={`/dashboard/${uid}`} className="Link" style={{ textDecoration: 'none'}}>
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