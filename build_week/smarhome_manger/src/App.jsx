import { Route,Routes,Navigate } from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Routines from "./pages/Routines";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";


function App() {

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
        <Route path="/routines" element={<ProtectedRoute><Routines /></ProtectedRoute>} />
      </Routes>
    </div>
      
    </>
  )
}

export default App;
