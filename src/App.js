
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from './components/Auth/Login';
import {CreateUser} from './components/Auth/CreateUser';
import {Dashboard} from './components/Dashboard';
import {Navbar} from './components/NavBar/Navbar';
import {NavbarLogin} from './components/NavBar/NavbarLogin';
import { ProjectDashboard } from './components/Projects/ProjectDashboard';
import { CreateProject } from './components/Projects/CreateProject';
import { AddParticipant } from './components/Projects/AddParticipant';
//import {AuthProvider, AuthConsumer} from './context/JWTAuthContext'
import { UserContext } from './components/Auth/UserContext';
import { useState, useEffect } from 'react';
import PrivateRoute from './components/Auth/PrivateRoute';
import { Profile } from './pages/Profile';
import { TrainingHistory } from './pages/trainingSessions';
import { AnnotationHistory } from './pages/annotationHistory';
import { MainPage } from './pages/mainPage';
import { TrainingConfig } from './pages/startSession';
import { NavbarTraining } from './components/NavBar/NavBarTraining';

// wrap everyting up in auth provider

window.API_BASE_URL = "http://10.68.12.87:8080";
window.API2_BASE_URL = "http://10.68.12.87:8888";

function App() {
  const [user, setUser] = useState(null);
  const isLoginPage = window.location.pathname === '/';
  const isTrainingPage = window.location.pathname.startsWith('/training/')
  


  return (
    <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
        {!isTrainingPage && !isLoginPage && <Navbar />}
        {isLoginPage && <NavbarLogin />}
        {isTrainingPage && <NavbarTraining/>}
          <Routes key={window.location.pathname}>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard/:uid" element={<Dashboard/>}/>
            <Route path="/profile/:uid" element={<Profile/>}/>
            <Route path="/project/:id" element={<ProjectDashboard/>} />
            <Route path="/user/:uid" element={<CreateUser/>} />
            <Route path="/project" element={<CreateProject/>} />
            <Route path="/project/:id/add" element={<AddParticipant/>} />
            <Route path="/trainingDashboard/:pid" element={<TrainingHistory/>} />
            <Route path="/trainingHistory/:pid" element={<AnnotationHistory/>} />
            <Route path="/training/:userId" element={<MainPage/>} />
            <Route path="/training/new/:userId/:projectId" element={<TrainingConfig/>} />
          </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    
    
  );
}

export default App;
