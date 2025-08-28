import { Navigate } from 'react-router-dom';
import { useUser } from './context'; // your custom hook

const ProtectedRoute = ({ children }) => {
  const { profile ,loading} = useUser(); 

  if (loading) return <div className="text-white text-center">Loading...</div>; 

  return profile ? children : <Navigate to="/" replace />;
};
export default ProtectedRoute;