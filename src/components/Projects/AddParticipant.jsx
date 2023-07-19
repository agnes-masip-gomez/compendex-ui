
import { Box, Container, Button, FormControl, List, ListItem, ListItemText, TextField, Typography, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useParams, Form } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { fetchUsers } from '../../services/user_service'
import { fetchUsersOfAProject, updateParticipants, deleteParticipant } from '../../services/project_service'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../Auth/UserContext';

//TODO
// error form control -> easy

// Disable all the participatns from the available user list


export const AddParticipant = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [userRows, setUsers] = useState([]);
  const [userProjectRows, setUsersProject] = useState([]);
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [interactions, setInteractions] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();
  // only executes when component is mounted for the first time
  useEffect(() => {
    fetchUsers().then(data => setUsers(data.filter(item => item._id !== user._id)));

    fetchUsersOfAProject(id).then(data => setUsersProject(data));

  }, []);

  const handleUserSelect = async (event) => {
    setSelectedUser(event.target.value);
    //await updateParticipants(id, formData);
  };

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const response = await updateParticipants(id, formData);
    if (response === "participant already in list") {
      setInteractions("Participant already in list")
    } else { setInteractions("User added") }

    console.log(response)
    console.log(formData)
    fetchUsersOfAProject(id).then(data => setUsersProject(data));
  };

  const handleDelete = async (uprow) => {
    await deleteParticipant(id, uprow);
    fetchUsersOfAProject(id).then(data => setUsersProject(data));
  };

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
        <Button startIcon={<KeyboardBackspaceIcon />} sx={{ gridRow: '1', gridColumn: '9/10' }}>
          <Link to={`/dashboard/${user._id}`} className="Link" style={{ textDecoration: 'none' }}>
            Back
          </Link>
        </Button>
        <Typography variant="h3">Add Participants</Typography>
        <Typography variant="p">Select a user from the list.</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="userList">Users</InputLabel>
            <Select
              labelId="userlistLabel"
              id="userlistLabel"
              label="Users"
              {...register('participant', { required: true })}
              value={selectedUser}
              onChange={handleUserSelect}
            //onChange={handleChange}
            >
              {userRows.map((urow) => (
                <MenuItem key={urow._id} value={urow._id}>
                  {urow.fullname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            mt={6}
            mb={6}
            type="submit"
          >
            Assign user to the project
          </Button>
        </form>
        {interactions && (
          <div>
            <Box mt={2}> </Box>
            {interactions === "User added" ? (
              <Alert severity="success">User added</Alert>
            ) : interactions === "Participant already in list" ? (
              <Alert severity="error">Participant already in list</Alert>
            ) : null}
          </div>
        )}
      </Box>
      <Typography variant="p">Current participants:</Typography>
      <List>
        {userProjectRows.map((uprow) => (
          <ListItem key={uprow}>
            <ListItemText primary={uprow}>
            </ListItemText>
            {/* <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(uprow)}>
          <DeleteIcon />
        </IconButton> */}
          </ListItem>

        ))}

      </List>

    </Container>
  )
};