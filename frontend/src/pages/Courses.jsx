import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courseAPI } from '../services/api';
import AddCourseModal from '../components/AddCourseModal';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseAPI.getCourses();
      setCourses(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.message);
      if (err.message.includes('401')) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      await courseAPI.createCourse(courseData);
      setShowModal(false);
      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      setDeleting(courseId);
      await courseAPI.deleteCourse(courseId);
      fetchCourses();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="courses-container">
      <nav className="courses-nav">
        <div className="nav-left">
          <button onClick={handleBack} className="btn-back">← Back</button>
          <h1>Courses</h1>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-add-course">
          + Add Course
        </button>
      </nav>

      {error && <div className="error-banner">{error}</div>}

      <main className="courses-content">
        {loading ? (
          <div className="loading">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="empty-state">
            <p>No courses yet. Create your first course!</p>
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Add First Course
            </button>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="course-card">
                <div className="course-header">
                  <h3>{course.courseName}</h3>
                </div>
                <div className="course-body">
                  <p className="course-instructor">
                    <strong>Instructor:</strong> {course.instructor}
                  </p>
                  <p className="course-description">{course.courseDescription}</p>
                </div>
                <div className="course-footer">
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    disabled={deleting === course._id}
                    className="btn-delete"
                  >
                    {deleting === course._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddCourseModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddCourse}
        />
      )}
    </div>
  );
};

export default Courses;
