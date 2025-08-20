import { useUser } from './context';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;