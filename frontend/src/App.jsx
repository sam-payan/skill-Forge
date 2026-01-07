import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
import Onboarding from "./pages/Onboarding";
import Roadmap from "./pages/Roadmap";
import Assessments from "./pages/Assessments";
import Mentor from "./pages/Mentor";
import Profile from "./pages/Profile";
import TaskExecution from "./pages/TaskExecution";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/task/:taskId" element={<TaskExecution />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;