import { Button, TextField, styled } from "@mui/material";
import { useState } from 'react'; 
import { updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#1976d2',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1976d2',
    },
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});


const SignUpForm = () => {
  const [signUpStep, setsignUpStep] = useState('credentials');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const updateEmail = (updatedEmail) => {
    setEmail(updatedEmail);
  }

  const updatePassword = (updatedPassword) => {
    setPassword(updatedPassword);
  }

  const updateConfirmPassword = (updatedPassword) => {
    setConfirmPassword(updatedPassword);
  }

  const moveToProfile = () => {
    setsignUpStep('profile');
  }

  const createChef = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: auth.currentUser.email,
      firstName: firstName,
      lastName: lastName, 
      displayName: auth.currentUser.displayName
    });
  }
  
  return (
    <div style={{ fontSize: '2rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem' }}>
      <div style={{ color: 'white', padding: '0 2rem', marginBottom: '1rem' }}>new chef sign up</div>
      { signUpStep === 'credentials' ? 
        <form autoComplete="off">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CssTextField onChange={e => updateEmail(e.target.value)}
                        label='Email' variant='outlined' type='email' 
                        inputProps={{ style: { color: 'white', fontFamily: 'monospace', fontWeight: 700 } }}
                        InputLabelProps={{ style: { fontFamily: 'monospace', fontWeight: 700 } }}
                        sx={{ marginBottom: '1rem', width: '75%' }}
                        value={email ?? ''}
                        />
            <CssTextField onChange={(e) => updatePassword(e.target.value)}
                        label='Password' variant='outlined' type='password' 
                        inputProps={{ style: { color: 'white', fontFamily: 'monospace', fontWeight: 700 } }}
                        InputLabelProps={{ style: { fontFamily: 'monospace', fontWeight: 700 }}}
                        sx={{ marginBottom: '1rem', width: '75%' }}
                        value={password ?? ''}
                          // error={!passwordValid}
                        />
            <CssTextField onChange={(e) => updateConfirmPassword(e.target.value)}
                        label='Confirm Password' variant='outlined' type='password' 
                        inputProps={{ style: { color: 'white', fontFamily: 'monospace', fontWeight: 700 } }}
                        InputLabelProps={{ style: { fontFamily: 'monospace', fontWeight: 700 }}}
                        sx={{ marginBottom: '1rem', width: '75%' }}
                        value={confirmPassword ?? ''}
                        // error={confirmPasswordValid}
                        />
            <Button type="button" onClick={() => moveToProfile()} sx={{ color: 'white', fontSize: '1.5rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem' }}>Continue</Button>
          </div>
        </form> : 
        <form autoComplete="off">
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <CssTextField onChange={e => setFirstName(e.target.value)}
                          label='First Name' variant='outlined' type='text' 
                          inputProps={{ style: { color: 'white', fontFamily: 'monospace', fontWeight: 700 } }}
                          InputLabelProps={{ style: { fontFamily: 'monospace', fontWeight: 700 } }}
                          sx={{ marginRight: '1rem', width: '75%' }}
                          value={firstName ?? ''}
                          />
            <CssTextField onChange={e => setLastName(e.target.value)}
                        label='Last Name' variant='outlined' type='text' 
                        inputProps={{ style: { color: 'white', fontFamily: 'monospace', fontWeight: 700 } }}
                        InputLabelProps={{ style: { fontFamily: 'monospace', fontWeight: 700 } }}
                        sx={{ width: '75%' }}
                        value={lastName ?? ''}
                        />
            <Button type="button" onClick={() => createChef()}>Continue</Button>
          </div>
        </form>
      }

    </div>
  )
}

export default SignUpForm;