import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useEffect } from "react";

const SignIn = () => {

  useEffect(() => {
      const ui = firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth());
      const uiConfig = {
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
          },
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID
          }
        ],
        // signInSuccessUrl: '/recipes'
      };

      ui.start('#authContainer', uiConfig);
  }, [])

  return (
    <div style={{ fontSize: '1.5rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem' }}>
      Welcome back chef
      <div id='authContainer' style={{ height: '50%' }}></div>
    </div>
  )
}

export default SignIn;