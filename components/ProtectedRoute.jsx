import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuth, user, accountType } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isAllowed = isAuth && user && allowedRoles.includes(accountType);

  useEffect(() => {
    // If it's not the first render and user is not allowed, navigate to "/"
    if (!isAuth && !isAllowed) {
        navigate("/");
    }

  }, [isAllowed, isAuth, navigate]);

  return isAllowed ? children : null;
};

export default ProtectedRoute;
