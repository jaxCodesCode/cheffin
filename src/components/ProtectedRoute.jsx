import { Navigate } from "react-router-dom";
import { auth } from "../firebaseconfig";
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children }) => {
  if (auth.currentUser.isAnonymous) {
    return <Navigate to='/recipes' replace />
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.object
}

export default ProtectedRoute;