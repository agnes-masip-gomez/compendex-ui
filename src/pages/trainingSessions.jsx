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
  TableRow, Alert
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  getTrainingSessionsByProject,
  checkTaskStatus,
} from "../services/session";
import { PromiseRenderer } from "../components/Promise/PromiseRenderer";
import { UserContext } from "../components/Auth/UserContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { fetchUserData} from '../services/user_service';
import { fetchPrecisionProject, fetchPrecisionsLabelProject, fetchUsersOfAProject} from '../services/project_service'


export const TrainingHistory = () => {
  const { user, setUser } = useContext(UserContext);
  const { pid } = useParams();
  const projectId = pid;
  const [userId, setUid] = useState("");

  const navigate = useNavigate();
  const [tsessions, setTrainingSessions] = useState([]);
  const [userProj, setUsersProject] = useState([]);
  const [taskStatus, setTaskStatus] = useState(null);
  const [precision, setPrecision] = useState(null);
  const [allLabelsPrecision, setPrecisionAllLabels] = useState([]);

  const handleClick = (sesh) => {
    navigate(`/training/${userId}`, {
      state: { sessionId: sesh, uid: userId, pid: projectId },
      replace: true,
    });
    localStorage.setItem("pid", projectId);
    localStorage.setItem("sessionId", sesh);
  };

  // that ends up in the table
  // button that is link with the get with the async result we created, should work ithink

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("userId");
      await setUid(uid);
      console.log(userId)
      getTrainingSessionsByProject(projectId).then((data) =>
      
      setTrainingSessions(data));
      fetchUsersOfAProject(projectId).then((data) => setUsersProject(data))
      


      // fetchPrecisionProject(projectId).then((pdata) => setPrecision(pdata))
      fetchPrecisionsLabelProject(projectId).then((labelData) => setPrecisionAllLabels(labelData))
    
  };
  fetchData()

  }, []);

  const getNameByUid = async(uid) => {
    const userData = await fetchUserData(uid);
    setUsersProject(userData)
  }
  
  const statusChecker = async (celeryId) => {
    // if (celeryId == null){
    //   setTaskStatus("Loading")
    // }else{
    const status = await checkTaskStatus(celeryId);
    setTaskStatus(status);
    // }
    // console.log(status)

  };

  const handleReload = async () => {
    getTrainingSessionsByProject(projectId).then((data) =>
      setTrainingSessions(data)
    );
    console.log(userId)
    console.log(projectId)

  };

  // celery -A proj worker --loglevel=INFO --concurrency=2

  return (
    <div className="container-app">
      <Box>
        <div className="titleRow">
          <p className="title">Training Sessions</p>
          <div className="flex">
            <p className="separatedText"> {tsessions.length}</p>

            {tsessions.length === 0 && (
              <Link
                to={`/training/new/${userId}/${projectId}`}
                className="title-button"
                style={{ textDecoration: "none", paddingLeft: "4vh" }}
              >
                + Create New Training Session
              </Link>
            )}

            <div className="rightButtonal">
              <button className="trainingButton" onClick={handleReload}>
                {/* <Link
                  to={`http://localhost:3001?userId=${userId}&projectId=${projectId}`}
                  className="Link"
                  style={{ textDecoration: "none" }}
                > */}
                <p className="navbar-signout-text"> Reload</p>
                {/* </Link> */}
              </button>
            </div>
          </div>
        </div>

        <hr className="divider"></hr>
        <Box display="flex" ml="auto" className="right-navbar"></Box>

        <Box>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                marginRight: "10px",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Domain</TableCell>
                    <TableCell>Requested Records to Annotate</TableCell>
                    <TableCell>Left to annotate</TableCell>
                    <TableCell>Users Involved</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tsessions.map((row) => {
                    if (!row) {
                      return null;
                    }
                    return (
                      <TableRow key={row._id}>
                        <TableCell>{row.domain}</TableCell>
                        <TableCell>{row.starting_number_of_records}</TableCell>
                        <TableCell>{row.current_number_of_records}</TableCell>
                        <TableCell>{row.users.length}</TableCell>
                        <TableCell>
                          {statusChecker(row.celery_async_task) &&
                            row.celery_async_task && row.current_number_of_records !== 0 ? (
                            <button
                              onClick={() => handleClick(row._id)}
                              className="table-button"
                              disabled={taskStatus === "Loading"}
                            >
                              {taskStatus === "Train Model"
                                ? "Start Training"
                                : "Loading..."}
                            </button>
                          ) : row.current_number_of_records === 0 ? (
                            <button className="table-button" disabled={true}>
                              Finished
                            </button>
                          ) : (
                            <button className="table-button" disabled={taskStatus === "Loading"}>
                              Loading
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            <Button startIcon={<KeyboardBackspaceIcon />} sx={{ gridRow: '1', gridColumn: '9/10' }}>
              <Link to={`/dashboard/${userId}`} className="Link" style={{ textDecoration: 'none' }}>
                Back
              </Link>
            </Button>
            <Alert severity="info">When the button is "Loading", there are background processes being done in the background that can take some minutes.
              Click the button reload after a while until the button shows "Start Training". </Alert>
          </Grid>
          <hr className="divider"></hr>
          <button className="trainingButton">
            <Link
                  to={`/trainingHistory/${projectId}`}
                  className="Link"
                  style={{ textDecoration: "none" }}
                >
                  <p className="navbar-signout-text"> Annotation History</p>
              </Link>
          </button>
          <div className="titleRow">
            <p className="small-title">Model Insights for this project</p>
          </div>
            <p>Model precision: {precision}</p>
            <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>Precision</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allLabelsPrecision.map((row) => {
                if (!row ) {
                  return null;
                }
                  return (
                    <TableRow key={`${row._id+23}`}>
                      <TableCell>{row.label}</TableCell>
                      <TableCell>{row.precision}</TableCell>
                    </TableRow>
                  );
              })}
              
            </TableBody>
          </Table>
            <div className="titleRow">
            <p className="small-title">User Insights</p>
          </div>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Domain</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Records Annotated</TableCell>
                <TableCell>Positive responses</TableCell>
                <TableCell>Negative Responses</TableCell>
                <TableCell>Unknown Responses</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tsessions.map((row) => {
                if (!row || !row.users ) {
                  return null;
                }

                return row.users.map((user, index) => {
                  
                  // Find the positive response object for the current user
                  const positiveResponse = row.number_positive_responses.find(
                    (response) => response.userId === user
                  );
              
                  // Find the negative response object for the current user
                  const negativeResponse = row.number_negative_responses.find(
                    (response) => response.userId === user
                  );

                  const unkResponse = row.number_unknown_responses.find(
                    (response) => response.userId === user
                  );
              
                  return (
                    <TableRow key={`${row._id}-${user}-${index}`}>
                      <TableCell>{row.domain}</TableCell>
                      <TableCell>{userProj[index]}</TableCell>
                      <TableCell>{positiveResponse ? positiveResponse.resp + negativeResponse.resp + unkResponse.resp: "-"}</TableCell>
                      <TableCell>{positiveResponse ? positiveResponse.resp : "-"}</TableCell>
                      <TableCell>{negativeResponse ? negativeResponse.resp : "-"}</TableCell>
                      <TableCell>{unkResponse ? unkResponse.resp : "-"}</TableCell>
                    </TableRow>
                  );
                });
              })}
              
            </TableBody>
          </Table>


        </Box>
      </Box>
    </div>
  );
};
