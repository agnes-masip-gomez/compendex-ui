import { Container, Grid, Box, Button, Typography, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { ProjectList } from "./Projects/ProjectList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Auth/UserContext";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  return (
    <div className="container-app">
      
        <ProjectList/>
    </div>
  );
};
