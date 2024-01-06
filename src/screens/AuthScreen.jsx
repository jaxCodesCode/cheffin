import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { Button, Divider } from '@mui/material';
import SignUpForm from '../components/SignUpForm';
import SignIn from "../components/SignIn";
import { auth } from "../firebaseconfig";
import { signInAnonymously } from "firebase/auth";

const AuthScreen = () => {
  const [authFlow, setAuthFlow] = useState('');

  useEffect(() => {
    if (authFlow === 'anon') {
      signInAnonymously(auth)
    }
  }, [authFlow])

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem'}}>
        <div style={{ justifySelf: 'flex-start', height: '50%' }}>
          <div style={{fontSize: '2rem', fontColor: 'white', fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',}}>
            {`let's get to`}
          </div>
          <div style={{fontSize: '6rem', color: '#1976d2', fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem', lineHeight: '4rem', paddingBottom: '1.75rem', borderBottom: 'thin solid white'}}>cheffin</div>
        </div>
        { (authFlow === '' || authFlow === 'anon') && 
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '2rem', fontColor: 'white', fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem' }}>
            <div style={{ marginBottom: '1rem' }}>I am a...</div>
            <Button onClick={() => setAuthFlow('sign-up')} sx={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', marginBottom: '0.5rem'  }}>New Chef</Button>
            <Button onClick={() => setAuthFlow('sign-in')} sx={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', marginBottom: '0.5rem'  }}>Existing Chef</Button>
            <Divider color='white' variant="middle" sx={{ marginBottom: '0.5rem' }} />
            <Button onClick={() => setAuthFlow('anon')} sx={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem'  }}>Guest Chef</Button>
          </div>
        }
        <div>
          {
            authFlow === 'sign-up' ? <SignUpForm /> :
            authFlow === 'sign-in' ? <SignIn /> : null
          }
        </div>
        { (authFlow !== '' && authFlow !== 'anon') &&
          <Button onClick={() => setAuthFlow('')} sx={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem' }}>Go Back</Button>
        }
      </div>
    </>
  )
}

AuthScreen.propTypes = {
  setSignedIn: PropTypes.func
}

export default AuthScreen;