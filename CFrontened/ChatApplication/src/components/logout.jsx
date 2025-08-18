import { useUser } from './context';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // or wherever your login route is
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;