import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box
} from "@mui/material";
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { fetchRole } from "../../services/user_service";
import { fetchData, fetchDataByRole } from "../../services/project_service";

import { ProjectDashboard } from "./ProjectDashboard";
import { UserContext } from "../Auth/UserContext";

// Info from DB

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

export const ProjectList = () => {
  const { user } = useContext(UserContext);
  
  const [rows, setRows] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // TODO does not properly work when not admin
    fetchDataByRole(user._id).then((data) => setRows(data));
  }, []);

  const navigate = useNavigate();
  return (
    <Box>
        <div className="titleRow">
          <p className="title">Projects</p>

          <div className="flex">
            <p className="separatedText"> {rows.length} Items</p>

            <Link
              to={`/project`}
              className="title-button"
              style={{ textDecoration: "none",  paddingLeft: "3vh" }}
            >
              + Create a New Project
            </Link>
          </div>
        </div>

        <hr className="divider"></hr>

        <div>
      
      {rows.map((row) => (
        <div className="projects">
          <div className="flex">
            <p className="projectName">{row.name}</p>

            <Link
              to={`/project/${row._id}/add`}
              className="title-button"
              style={{ textDecoration: "none", paddingLeft: "3vh" }}
            >
              Add Participant
            </Link>
          </div>
          <div className="rightButton">
            <button className="trainingButton">
              <Link
                to={`/trainingDashboard/${row._id}`}
                className="Link"
                style={{ textDecoration: "none" }}
              >
                <p className="navbar-signout-text"> Start Training</p>
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
      </Box>
    
  );
};
