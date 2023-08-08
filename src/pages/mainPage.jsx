import { Container, Grid, Box, Button, Typography, Paper } from "@mui/material";
import { ALearningPane } from "../components/ALearningPane/ALearningPane";
import { useState, useEffect, useContext } from "react";
import { History } from "../components/HistoryPane/history";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/HistoryPane/Sidebar";
import { UserContext } from "../components/Auth/UserContext";

export const MainPage = () => {
  const {user} = useContext(UserContext);
  const [uid, setUid] = useState("");
  const [projectId, setPid] = useState("");
  const [sessionId, setSession] = useState("");
  const [historyKey, setHistoryKey] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("userId");
      await setUid(uid);
      const pid = localStorage.getItem("pid");
      await setPid(pid);
      const sesh = localStorage.getItem("sessionId");
      await setSession(sesh);
      console.log(sessionId)
      console.log(projectId)
      console.log(uid)
    
  };
  fetchData()

  }, []);


  return (
    <div>
      <div className="trainingPage">
        <div className="leftBar">
          {sessionId && <History key={historyKey} sessionId={sessionId}  />}
        </div>
        <div>
          {sessionId && <ALearningPane sessionId={sessionId} userId={uid} projectId={projectId} onUpdateHistory={() => setHistoryKey(historyKey + 1)}  />}
        </div>
      </div>
    </div>
  );
};
