//Styles
import "./App.css";

//context 
import { AuthProvider } from "./context/AuthContext";

//Import of Rounter
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateTask from "./pages/CreateTask/CreateTask";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import Task from "./pages/Task/Task";
import EditTask from "./pages/EditTask/EditTask";
import Start from "./pages/Start/Start";






//Pages
function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=>{

    onAuthStateChanged(auth, (user)=>
    {
      setUser(user)
    });

  }, [auth]);

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path="/" element={!user ? <Start/> : <Navigate to="/"/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/task/:id" element={<Task/>}/>
              <Route path="/home" element={user ? <Home/> : <Navigate to="/"/>}/>
              <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
              <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
              <Route path="/tasks/create" element={user ? <CreateTask/> : <Navigate to="/login"/>}/>
              <Route path="/tasks/edit/:id" element={user ? <EditTask/> : <Navigate to="/login" />}/>
              <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
   </div>
  );
}

export default App;
