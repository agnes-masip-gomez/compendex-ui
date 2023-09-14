import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Alert, ButtonGroup
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  getTrainingSessionsByProject, updateNegatives, updatePositives, updateUnknowns, decreaseAbstractBatch, decreasePositives, decreaseNegatives,
  checkTaskStatus, getRespInfoAnnotations
} from "../services/session";
import { PromiseRenderer } from "../components/Promise/PromiseRenderer";
import { UserContext } from "../components/Auth/UserContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { fetchUserData } from '../services/user_service';

import {
  
  userRespond,

} from "../services/abstract";

import { fetchPrecisionProject, fetchPrecisionsLabelProject, getAnnotations, getAbsInfoAnnotations, fetchData } from '../services/project_service'


export const AnnotationHistory = () => {
  const { pid } = useParams();
  const projectId = pid;
  const [userId, setUid] = useState("");

  const navigate = useNavigate();
  const [tsessions, setTrainingSessions] = useState([]);
  const [userProj, setUsersProject] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [allData, setAllData] = useState([]);

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = localStorage.getItem("userId");
        await setUid(uid);
        const data = await getAnnotations(pid, uid)
        setAnnotations(data);

        const infoPromises = data.map(async (row) => {
          const abstract = await getAbsInfoAnnotations(row.abstractId);
          const resp = await getRespInfoAnnotations(row.responseId);
          return {label: abstract.label, title: abstract.title, content: abstract.abstract, abstractId: row.abstractId, responseId: row.responseId, response: resp.response};
        });
        // getInfoAnnotations(annotations)
        // Wait for all promises to resolve using Promise.all

        console.log("hey")
        const newDataArray = await Promise.all(infoPromises);
        console.log(newDataArray);

        // Update the allData state with the new data
        setAllData(newDataArray);
          
      } catch (error) {
        console.error("Error fetching or setting annotations:", error);
      }

    };
    fetchData();
    

  }, []);

  const updateAllDataResponse = (responseId, newResponse) => {
    setAllData((prevAllData) =>
      prevAllData.map((row) => {
        if (row.responseId === responseId) {
          return { ...row, response: newResponse };
        }
        return row;
      })
    );
  };
  
  const handleResponse = async (response, row) => {
    if (response !== "idk") {
      const datetime = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Paris",
      });
      const timeEnds = new Date(datetime).getTime();
      
      await userRespond(row.responseId, response, timeEnds);
      // get training session id (important for the update insights routes)
      const tsession = await getTrainingSessionsByProject(pid)
      const sessionId = tsession[0]._id
      if (response === "true"){
        await updatePositives(sessionId, userId, row.title, row.content, row.label);
        await decreaseNegatives(sessionId, userId);
      }
      else if (response === "false"){
        await updateNegatives(sessionId, userId);
        await decreasePositives(sessionId, userId);
        await decreaseAbstractBatch(sessionId, row.title, row.label)
      }
    } else {
      // await updateUnknowns(sessionId, userId);
      // CONCEPTUAL BUG addAbstractBackToList(sessionId, abstract._id);
      // this would just return the same one again, something similar that gives it to another user or something await 
    }
    updateAllDataResponse(row.responseId, response);
    
  };


  return (
    <div className="container-app">
      <Box>
        <div className="titleRow">
          <p className="small-title">Annotation History</p>
          <div className="flex"></div>
        </div>
        <Button startIcon={<KeyboardBackspaceIcon />} sx={{ gridRow: '1', gridColumn: '9/10' }}>
          <Link to={`/trainingDashboard/${projectId}`} className="Link" style={{ textDecoration: 'none' }}>
            Back
          </Link>
        </Button>
      </Box>
      <hr className="divider"></hr>
      {allData && allData.length > 0 ? (
      allData.slice().reverse().map((row) => {
        if (!row) {
          return null;
        }

        return (
          
          <div className="annotations" >
            <h3>Title: {row.title}</h3>
            <h5>Annotated Label: {row.label}</h5>
            <p>{row.content}</p>
            <h5>Current response: {row.response}</h5>
            <p>Abstract ID: {row.responseId}</p>
            <Box display="flex" justifyContent="center">
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => handleResponse("true", row)}
                  style={{ backgroundColor: "green" }}
                >
                  Correct
                </Button>
                <Button
                  onClick={() => handleResponse("false", row)}
                  style={{ backgroundColor: "red" }}
                >
                  False
                </Button>
              </ButtonGroup>
            </Box>
          </div>
        );
      })
    ) : (
      
      <p>No annotations available.</p>
    )}
  </div>
)};
