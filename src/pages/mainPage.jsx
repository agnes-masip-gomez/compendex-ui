import { Container, Grid, Box, Button, Typography, Paper } from "@mui/material";
import { ALearningPane } from "../components/ALearningPane/ALearningPane";
import { useState, useEffect, useContext } from "react";
import { History } from "../components/HistoryPane/history";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/HistoryPane/Sidebar";
import { UserContext } from "../components/Auth/UserContext";

export const MainPage = () => {
  const { user } = useContext(UserContext);
  const [historyKey, setHistoryKey] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const sessionId = state?.sessionId;
  //const label = state?.label;
  const userId = state?.uid;
  const projectId = state?.pid;


  return (
    <div>
      <div className="trainingPage">
        <div className="leftBar">
          <History key={historyKey} sessionId={sessionId} />
        </div>
        <div>
          <ALearningPane sessionId={sessionId} userId={userId} projectId={projectId} onUpdateHistory={() => setHistoryKey(historyKey + 1)}  />
        </div>
      </div>
    </div>
  );
};
