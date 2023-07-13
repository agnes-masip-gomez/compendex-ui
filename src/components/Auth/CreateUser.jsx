import {
  Box,
  Container,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { signup } from "../../services/auth_service";
import { UserContext } from "./UserContext";

//TODO
// error form control -> easy
export const CreateUser = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (formData) => {
    signup(formData).then((data) =>
      navigate(`/dashboard/${user._id}`, { replace: true })
    );
  };

  return (
    <Container height="100vh" alignItems="center" justifyContent="center">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          sx={{ gridRow: "1", gridColumn: "9/10" }}
        >
          <Link
            to={`/dashboard/${user._id}`}
            className="Link"
            style={{ textDecoration: "none" }}
          >
            Back
          </Link>
        </Button>

        <Typography variant="h3">Create User</Typography>
        <Typography variant="p">
          Assign a password to an email and username you want to add in the
          platform.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            fullWidth
            margin="normal"
            placeholder="Name"
            id="name"
            {...register("fullname")}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            placeholder="Email"
            id="email"
            {...register("email")}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            placeholder="Password"
            id="password"
            {...register("password")}
          />
          <Button fullWidth variant="contained" mt={6} mb={6} type="submit">
            Sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
};
