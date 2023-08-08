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
    // delete unfinished user response would be nice
    console.log(abstract)
    navigate(`/trainingDashboard/${projectId}`, { replace: true });
  };

  const handleResponse = async (response) => {
    if (response !== "idk") {
      const datetime = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Paris",
      });

      // This part is to calculate how many minutes a user takes to annotate that specific abstract.
      // However, after the first sprint, I think it's better to store the timeEnds and if we ever need the time spent calculate it
      // in the frontend without storing it in the database.
      const timeStarts = new Date(currentUserResponse.time_starts).getTime();
      const timeEnds = new Date(datetime).getTime();
      const TimeSpentMS = Math.abs(timeEnds - timeStarts);
      const finalTimeSpent = Math.floor(TimeSpentMS / (1000 * 60));

      await userRespond(currentUserResponse._id, response, timeEnds);
      if (response === "true")
        await updatePositives(sessionId, userId, abstract.title, abstract.abstract, abstract.label);
      else if (response === "false") await updateNegatives(sessionId, userId);
    } else {
      await updateUnknowns(sessionId, userId);
      // CONCEPTUAL BUG addAbstractBackToList(sessionId, abstract._id);
      // this would just return the same one again, something similar that gives it to another user or something await 
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
      // console.log(data)
      // 500 interal server error, it works but maybe change api so the error does not fire
      if (data === "empty") {
        navigate(`/trainingDashboard/${projectId}`, { replace: true });
      } else {
        setAbstract(data);
        createUserResponse(sessionId, data._id, userId, projectId, datetime, data.label).then(
          (data) => setUserResponse(data)
        );
      }

    } else {
      newBatchProcess(sessionId);
    }
  };

  return (
    <div>
      <Box flexDirection="column" flex={1}>
        <div className="abstract">
          <h3 className="">Label: {abstract.label}</h3>
          <h3>Title: {abstract.title}</h3>
          <p className=""> {abstract.abstract} </p>
          <p>
            Keywords: {abstract.CCVCMH}
           
          </p>
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
