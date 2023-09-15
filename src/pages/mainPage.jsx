
import {
  Container, Grid, Box, Button, Typography, Paper,
  ButtonGroup,
  ThemeProvider,
} from "@mui/material";
// import { ALearningPane } from "../components/ALearningPane/ALearningPane";
import { useState, useEffect, useContext } from "react";
// import { History } from "../components/HistoryPane/history";
import { useLocation, useNavigate } from "react-router-dom";
// import Sidebar from "../components/HistoryPane/Sidebar";
import { UserContext } from "../components/Auth/UserContext";
import {
  getTrainingSessionInfo, updateNegatives,
  updatePositives,
  updateUnknowns,
  updateRecordsLeft
} from "../services/session";


import {
  getNextAbstractRanked,
  userRespond,
  createUserResponse,
  checkBatch,
  newBatchProcess,
  addAbstractBackToList,
  askChatGPT
} from "../services/abstract";



export const MainPage = () => {

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [uid, setUid] = useState("");
  const [projectId, setPid] = useState("");
  const [sessionId, setSession] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [domain, setDomain] = useState();
  const [nrecords, setNRecords] = useState();
  const [pos, setPositives] = useState();
  const [negs, setNegatives] = useState();
  const [unk, setUnknowns] = useState();
  const [rleft, setRecordsLeft] = useState();

  const [abstract, setAbstract] = useState([]);
  const [label, setLabel] = useState("");
  const [currentUserResponse, setUserResponse] = useState("");


  useEffect(() => {
    const datetime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Paris",
    });
    const fetchData = async () => {
      const uid = localStorage.getItem("userId");
      await setUid(uid);
      const pid = localStorage.getItem("pid");
      await setPid(pid);
      const sesh = localStorage.getItem("sessionId");
      await setSession(sesh);

      getTrainingSessionInfo(sesh).then((data) => {
        console.log(data)
        setData(data, uid);
        refresh(sesh, pid, uid)
      });

    };
    fetchData();



  }, []);



  async function setData(data, userId) {
    setDomain(data.domain);

    setNRecords(data.starting_number_of_records);
    if (data.current_number_of_records <= 0) {
      // addAbstractBackToList(sessionId, abstract._id); 
      // navigate(`/trainingDashboard/${projectId}`, { replace: true });
      // a warning to the user would be better than this rude redirect
      console.log(data.projectId)
      navigate(`/trainingDashboard/${data.projectId}`, { replace: true })
    }

    const pos = data.number_positive_responses.find(
      (response) => response.userId === userId
    );
    const posValue = pos ? pos.resp : 0;


    setPositives(posValue);

    const negatives = data.number_negative_responses.find(
      (response) => response.userId === userId
    );
    const respValue = negatives ? negatives.resp : 0;
    setNegatives(respValue);

    const unknowns = data.number_unknown_responses.find(
      (response) => response.userId === userId
    );

    const unkValue = unknowns ? unknowns.resp : 0;
    setUnknowns(unkValue);
    setRecordsLeft(data.current_number_of_records);
  }


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
        await updatePositives(sessionId, uid, abstract.title, abstract.abstract, abstract.label);
      else if (response === "false") await updateNegatives(sessionId, uid);
    } else {
      await updateUnknowns(sessionId, uid);
      // CONCEPTUAL BUG addAbstractBackToList(sessionId, abstract._id);
      // this would just return the same one again, something similar that gives it to another user or something await 
    }
    await updateRecordsLeft(sessionId);
    refresh(sessionId, projectId, uid)
    getTrainingSessionInfo(sessionId).then((data) => {

      setData(data, uid);
    });

  };

  const refresh = async (sesh, pid, uid) => {


    const datetime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Paris",
    });
    const batchCheck = await checkBatch(sesh);
    if (batchCheck < 32) {
      const data = await getNextAbstractRanked(sesh);
      // console.log(data)
      // 500 interal server error, it works but maybe change api so the error does not fire
      if (data === "empty") {
        navigate(`/trainingDashboard/${pid}`, { replace: true });
      } else {
        setAbstract(data);
        createUserResponse(sesh, data._id, uid, pid, datetime, data.label).then(
          (data) => setUserResponse(data)
        );
        console.log(data)
        if (data.label && data.abstract) {
        //   console.log("hey")
          const question = `Asses if the label "${data.label}" is directly discussed in the text "${data.abstract}" Ït has the following keywords: "${data.CCVCMH}"`;
          askChatGPT(question)
            .then((response) => setChatbotResponse(response))
            .catch((error) => console.error("Error asking ChatGPT:", error));
        }
      }

    } else {
      newBatchProcess(sesh);
    }
  };


  return (
    <div>
      <div className="trainingPage">
        <div className="leftBar">
          <div className="historypane">
            <h3 className="historyTitle">Training Info</h3>
            <p className="historyP"> Domain: {domain}</p>
            <p className="historyP"> Total Records: {nrecords} </p>
            <h3 className="historyTitle">Session Progress</h3>
            <p className="historyP"> Yes: {pos} </p>
            <p className="historyP"> No: {negs} </p>
            <p className="historyP"> Not sure: {unk} </p>
            <p className="historyP"> Records Left: {rleft} </p>
          </div>
        </div>
        <div><div>


          <div className="twocolumns">
            <div className="abstract">
              <h3 className="">Label: {abstract.label}</h3>
              <h4>Title: {abstract.title}</h4>
              <p className=""> {abstract.abstract} </p>
              <p>
                Keywords: {abstract.CCVCMH}
              </p>
              <p>
                Taxonomy path: {abstract.taxonomy}

              </p>

              <div display="flex" justifyContent="center">
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
                    Skip abstract
                  </Button>
                </ButtonGroup>
              </div>
              <button className="stop-button" onClick={() => handleClick()}>
                Stop Training
              </button>
            </div>


          
          <div className="rightBar">
            <h4>ChatGPT Help:</h4>
            <h5>Asses the label {abstract.label} within the abstract</h5>
            <p>{chatbotResponse}</p>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>

  );
};
