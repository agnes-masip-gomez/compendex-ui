import { Container, Grid, Box, Button, Card, FormGroup, TextField, Typography, GridClasses, Paper} from '@mui/material';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Auth/UserContext";


export const ProjectDashboard = () => {
  const {id} = useParams();
  const { user } = useContext(UserContext);

    return (
      <Container>
        <Box padding={5} 
        marginLeft={10}
        marginTop={5}
        flexDirection="column">
        <Box>
          <Typography fontSize={24} fontWeight="bold">
            This is project {id}
          </Typography>
        </Box>

        <a href={`http://localhost:3001?userId=${user._id}`}>Go to training session microservice</a>


          
        </Box>
          
        
        
      </Container>
  
    
)};