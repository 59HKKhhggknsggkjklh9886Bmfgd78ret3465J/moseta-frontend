import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuth, user, accountType } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  const isAllowed = isAuth && user && allowedRoles.includes(accountType);

  console.log(isAllowed)

  useEffect(() => {
    // If it's not the first render, and user is not allowed, and user is authenticated, navigate to "/"
    if (!isAllowed && isAuth) {
        navigate("/");
    }
  }, [isAllowed, isAuth, navigate]);


  // If user is not authenticated, or user is not allowed, render null
  if (!isAuth || !isAllowed) {
    return null;
  }

  // If user is authenticated and allowed, render children
  return children;
};

export default ProtectedRoute;
