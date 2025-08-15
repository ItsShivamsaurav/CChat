import { useUser } from './context'; 
import { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';

const Navbar = () => {
  const { profile } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    
    const res = await fetch(`/api/users/search?username=${searchQuery}`);
    const user = await res.json();

    if (user && user._id) {
      navigate(`/${profile._id}/${user._id}/chatInterface`);
    } else {
      alert('User not found');
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-fit">
      <div className="bg-gradient-to-r from-[#1f1c2c] via-[#928dab] to-[#2c3e50] rounded-full shadow-xl px-8 py-3 flex items-center space-x-6">
        <ul className="flex space-x-8 text-white font-semibold text-sm">
          <NavItem to={`/${profile?._id}/recentchats`} label="Recent Chat" />
          <NavItem to={`/${profile?._id}/${id2}`} label="Recent Chat" />
          <NavItem to={`/${profile?._id}/globalChat`} label="Global Chat" />
          <NavItem to={`/${profile?._id}/profileview`} label="Profile" />
          <NavItem to={`/${profile?._id}/logout`} label="Logout" />
        </ul>

        {profile && (
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-full text-sm text-black focus:outline-none"
            />
            <button
              type="submit"
              className="text-white font-semibold hover:text-purple-300 transition"
            >
              Chat
            </button>
          </form>
        )}
      </div>
    </nav>


   
  );
};


const NavItem = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="relative group transition duration-300 ease-in-out"
    >
      <span className="group-hover:text-purple-300 transition">{label}</span>
      <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </li>

  
);

export default Navbar;
