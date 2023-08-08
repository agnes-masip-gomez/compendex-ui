
import { Box, Container, Button, FormControl, TextField, Typography} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Auth/UserContext';
import { createProject } from "../../services/project_service";

//TODO
// error form control -> easy
export const CreateProject = () => {

    const [uid, setUid] = useState("");
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    const onSubmit = (formData) => {
      formData.participants = [uid];
      createProject(formData).then(data => {navigate(`/dashboard/${uid}`, { replace: true })});
      
      }
    
      useEffect(() => {
        const fetchData = async () => {
          const uid = localStorage.getItem("userId");
          await setUid(uid);
      };
      fetchData()
    
      }, []);
    return (
    <Container height="100vh" alignItems="center" justifyContent="center">
      <Box
       sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Button startIcon={<KeyboardBackspaceIcon/>} sx={{gridRow: '1', gridColumn: '9/10'}}>
            <Link to={`/dashboard/${uid}`} className="Link" style={{ textDecoration: 'none'}}>
                Back
            </Link>
        </Button>
      <Typography variant="h3">Create a Project</Typography>
      <Typography variant="p">Create a project repository to add all the users and training sessions.</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              fullWidth
              margin="normal"
              placeholder="Project name"
              id="name" 
              name="name" 
              {...register("name")}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              placeholder="Department"
              id="department"
              name="department" 
              {...register("department")}
            />
          <Button
            fullWidth
            variant="contained"
            mt={6}
            mb={6}
            type="submit"
            style={{ backgroundColor: '#b46012' }}
          >
            Create Project
          </Button>
        </form>
        
      </Box>
    </Container>
)};