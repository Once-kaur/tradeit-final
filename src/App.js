import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Profile from './Profile'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import Nav from './home/Navbar';
//import Read from './home/homepage';
//import Navbar from './home/Navbar';
//import {useState} from 'react'
import Head from './home/Head';
import Footer from './home/Footer';
import {AuthProvider} from './AuthContext'
import Upload from './upload';
import {useState, useEffect} from 'react'
// import {auth} from './firebase'
import { auth } from "./firebase";
import {onAuthStateChanged} from 'firebase/auth'
import FileList from './home/Filelist';
import Chatapp from './chatapp';
//import { useAuthState } from "react-firebase-hooks/auth";
//import {useAuthState} from "react-firebase-hooks/auth";
//import NavBar from "../src/components/NavBar";
// import ChatBox from "./components/ChatBox";
// import Welcome from "./components/Welcome";
function App() {
  // <Nav /> 
  
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])
  
  return (
    
  
    <Router>
      
       <div className="App">
      
        {/* <AuthProvider value={{currentUser}}> */}
      {/* {!user ? <Welcome /> : <ChatBox />} */}
        <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Nav /> 
        
     
      <Switch>
      {/* <Nav /> */}
      {/* <Route path="/Footer" component={Footer}/>
      <Route path="/Head" component={Head}/> */}
      {/* <Route path="/Nav" component={Nav}/> */}
      {/* <Route path='/Read' component={Read} /> */}
        <Route  path="/" exact component={Profile} />
        <Route  path="/login" component={Login} />
        <Route  path="/register" component={Register} />
        <Route  path='/verify-email' component={VerifyEmail} /> 
        <Route  path='/Upload'  component={Upload} />
        <Route  path='/Filelist'  component={FileList} />
        <Route path='/chatapp' components={Chatapp} />
      </Switch>
      
      </AuthProvider>
      </div>
  </Router>
    // <head />
  );
}

export default App;
