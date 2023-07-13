import {
  Container,
  Grid,
  Box,
  Button,
  ButtonGroup,
  Typography,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";

import { useContext } from "react";
import {
  getNextAbstractRanked,
  userRespond,
  createUserResponse,
  checkBatch,
  newBatchProcess,
  addAbstractBackToList
} from "../../services/abstract";
import {
  updateNegatives,
  updatePositives,
  updateUnknowns,
  updateRecordsLeft,
} from "../../services/session";
import { useNavigate } from "react-router-dom";

export const ALearningPane = ({
  sessionId,
  userId,
  projectId,
  onUpdateHistory,
}) => {
  const [abstract, setAbstract] = useState([]);
  const [label, setLabel] = useState("");
  const [currentUserResponse, setUserResponse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const datetime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Paris",
    });
    refresh();
  }, [sessionId, onUpdateHistory]);

  const handleClick = () => {
    addAbstractBackToList(sessionId, abstract._id);
    console.log(abstract)
    navigate(`/trainingDashboard/${projectId}`, { replace: true });
  };

  const handleResponse = async (response) => {
    if (response !== "idk") {
      const datetime = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Paris",
      });

      const timeStarts = new Date(currentUserResponse.time_starts).getTime();
      const timeEnds = new Date(datetime).getTime();
      const TimeSpentMS = Math.abs(timeEnds - timeStarts);
      const finalTimeSpent = Math.floor(TimeSpentMS / (1000 * 60));

      await userRespond(currentUserResponse._id, response, finalTimeSpent);
      if (response === "true")
        await updatePositives(sessionId, userId, abstract.title, abstract.abstract);
      else if (response === "false") await updateNegatives(sessionId, userId);
    } else {
      await updateUnknowns(sessionId, userId);
    }
    await updateRecordsLeft(sessionId);
    onUpdateHistory();
  };

  const refresh = async () => {
    
    const datetime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Paris",
    });
    const batchCheck = await checkBatch(sessionId);
    if (batchCheck < 32) {
      const data = await getNextAbstractRanked(sessionId);
      setAbstract(data);
      createUserResponse(sessionId, data._id, userId, projectId, datetime).then(
        (data) => setUserResponse(data)
      );
    } else {
      newBatchProcess(sessionId);
    }
  };

  return (
    <div>
      <Box flexDirection="column" flex={1}>
        <div className="abstract">
          <h3 className="">Label: {abstract.label}</h3>
          <p className=""> {abstract.abstract} </p>
        </div>

        <Box display="flex" justifyContent="center">
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => handleResponse("true")}
              style={{ backgroundColor: "green" }}
            >
              Correct
            </Button>
            <Button
              onClick={() => handleResponse("false")}
              style={{ backgroundColor: "red" }}
            >
              False
            </Button>
            <Button
              onClick={() => handleResponse("idk")}
              style={{ backgroundColor: "gray" }}
            >
              Not sure
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <button className="stop-button" onClick={() => handleClick()}>
        Stop Training
      </button>
    </div>
  );
};
