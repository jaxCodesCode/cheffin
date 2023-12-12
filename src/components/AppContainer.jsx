import { useEffect, useState } from "react";
import AppHeader from './../components/AppHeader';
import { auth } from "../firebaseconfig";
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import AuthScreen from "../screens/AuthScreen";

const AppContainer = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ 
          email: user.email, 
          uid: user.uid, 
          displayName: user.displayName
        })
        navigate(window.location.pathname === '/' ? '/recipes' : window.location.pathname);
      } else {
        setCurrentUser(null);
        navigate('/')
      }
    })
  }, []);

  const handleLogout = () => {
    auth.signOut();
  }

  return (
    <>
      { currentUser ?
        <AppHeader handleLogout={handleLogout} /> :
        <AuthScreen />
      }
    </>
  )
}

export default AppContainer;