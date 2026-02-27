import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>MERN App</h1>
        <div className="nav-actions">
          <span className="user-name">Welcome, {user?.name}!</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <div className="user-info">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
          
          <div className="dashboard-section">
            <h3>Courses</h3>
            <p className="section-description">Manage your courses here</p>
            <button onClick={handleViewCourses} className="btn-primary-large">
              View & Manage Courses
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
