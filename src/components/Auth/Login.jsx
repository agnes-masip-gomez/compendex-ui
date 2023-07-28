import {
  Box,
  Container,
  Button,
  FormControl,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { login } from "../../services/auth_service";

//TODO
// error form control -> easy
// Error DB control. No account, wrong password
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginFailed, setLoginFailed] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    try{
      const data = await login(email, password);
      console.log(data)
      if(data.detail == 'Wrong login details!'){
        console.log("Incorrect login")
        setLoginFailed(true)
      }else{
        
        await setUser(data);
        setIsFormSubmitted(true);
        navigate(`/dashboard/${data._id}`, { replace: true });
      }
     
      
    }catch(error){
      console.log(error.message)
    }
    
    
  };

  return (
    <div className="container-app">
      <p className="title">Login</p>
      <hr className="divider"></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="input-form">
          <input
            className="input-field"
            required
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <Box mt={3}></Box>
          </div>
          <input
            className="input-field"
            required
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <Box mt={3}></Box>
          </div>
          <button className="form-button" type="submit">
            <p className="button-text">Login</p>
          </button>

          {loginFailed && (
            <div>
              <Box mt={2}> </Box>
              <Alert severity="error">Incorrect login details. Try again.</Alert>
            </div>
          )}
        </Box>
      </form>

      <Box mt={2}></Box>

      <Alert severity="info" className="input-form">
        In this Beta version, passwords are not encrypted in the database - Be
        aware they can be seen by the administrators!
      </Alert>
    </div>
  );
};
