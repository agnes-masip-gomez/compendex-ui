import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  Card,
  LinearProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getTrainingSessionInfo } from "../../services/session";

import { UserContext } from "../Auth/UserContext";

export const History = ({sessionId, key}) => {

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const modelProgress = 50;
  const [domain, setDomain] = useState();
  const [nrecords, setNRecords] = useState();
  const [pos, setPositives] = useState();
  const [negs, setNegatives] = useState();
  const [unk, setUnknowns] = useState();
  const [rleft, setRecordsLeft] = useState();
  const [userId, setUid] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      await setUid(userId);
      getTrainingSessionInfo(sessionId).then((data) => setData(data));
    
  };
  fetchData()
  }, [sessionId]);

  function setData(data) {
    setDomain(data.domain);
    console.log(domain)
    setNRecords(data.starting_number_of_records);
    if(data.current_number_of_records <= 0){
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
    // console.log(unkValue)
    setUnknowns(unkValue);
    setRecordsLeft(data.current_number_of_records);
  }

  return (
    <div key={key} className="historypane">
      <h3 className="historyTitle">Training Info</h3>
      <p className="historyP"> Domain: {domain}</p>
      <p className="historyP"> Total Records: {nrecords} </p>
      {/* <h3 className="historyTitle">Model Training</h3>
      <p className="historyP"> Total Accuracy: tbd</p> */}
      {/* <LinearProgress
        variant="buffer"
        value={modelProgress}
        valueBuffer={100}
        size={80}
        thickness={4}
        sx={{
          color: "red",
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          modelProgress
        )}%`}</Typography>
      </Box> */}

      <h3 className="historyTitle">Session Progress</h3>
      <p className="historyP"> Yes: {pos} </p>
      <p className="historyP"> No: {negs} </p>
      <p className="historyP"> Not sure: {unk} </p>
      <p className="historyP"> Records Left: {rleft} </p>
      {/* <h3 className="historyTitle">History</h3> */}
    </div>
  );
};
