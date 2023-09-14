import { Container, Select, Box, Button, Typography, TextField, InputLabel, MenuItem, FormControl, Alert} from '@mui/material';
import { useNavigate, Link, useLocation, useParams} from "react-router-dom";
import { useContext } from "react"
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { startTrainingSession, getUsersByProject } from '../services/session';

export const TrainingConfig = () => {
    const { userId } = useParams();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const domainList = [{"_id": "23", "name": "Domain"}]
    const labelList = [{"_id": "23", "name": "Artificial Intelligence"}]
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');
    const [labelsVisible, setLabelsVisible] = useState('');
    const [nrecords, setNRecords] = useState('');
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm();

    
    const handleDomainSelect = (event) => {
        setSelectedDomain(event.target.value);
        setLabelsVisible(true)
      };
      const handleLabelSelect = (event) => {
        setSelectedLabel(event.target.value);
      };

      // TODO: the submit needs to return the ok, while the post is being done. possibly just redirect to a list of training sessions, and there show loading.
    const onSubmit = () => {
        // startTrainingSession(formData).then(data=> navigate("/training", { state: { sessionId: data, label: formData.label, uid: userId}, replace: true }))
        const datetime = new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' });
        getUsersByProject(projectId).then(userList => startTrainingSession(5000, userList, projectId, datetime).then(data=> navigate(`/trainingDashboard/${projectId}`, { state: { sessionId: data, uid: userId, pid: projectId}, replace: true }))
        )
        

    }  

    return (
      <div className="container-app">
      
      <p className="title">Start training session</p>
      <hr className="divider"></hr>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="input-form">
          {/* <input
            className="input-field"
            required
            placeholder="Number of records"
            id="nrecords"
            value={nrecords}
            onChange={(e) => setNRecords(e.target.value)} 
            /> */}

        <div><Box mt={3}></Box></div>
        <button className="form-button" type="submit">
              <p className="button-text">Start a session</p>
        </button>
          
        </Box>
        </form>
        <div><Box mt={3}></Box></div>
        <Alert severity="info">Currently, the data set are manually changed so do not add a training session without admin approval </Alert>
        </div>
  
    
)};