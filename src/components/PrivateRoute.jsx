import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  
  // Retrieve data from localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); 

  // 1. Check if User is Logged In
  if (!token) {
    // Determine which role view to show on the login page based on what they tried to access
    // If the route requires 'recruiter', tell Login to show Recruiter mode.
    // Otherwise, default to 'student'.
    const intendedRole = requiredRole === 'recruiter' ? 'recruiter' : 'student';

    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location, 
          defaultRole: intendedRole // Passing this to Login.jsx
        }} 
        replace 
      />
    );
  }

  // 2. Check for Role (if a specific role is required)
  if (requiredRole && userRole !== requiredRole) {
    // User is logged in but has WRONG role (e.g. Student trying to Post Job)
    // Redirect to home to avoid infinite loops
    return <Navigate to="/" replace />; 
  }

  // 3. If all checks pass, render the protected page
  return children;
};

export default PrivateRoute;
