import { useState } from 'react';
import '../styles/Modal.css';

const AddCourseModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    instructor: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.courseName.trim()) {
      setError('Course name is required');
      return;
    }

    if (!formData.courseDescription.trim()) {
      setError('Course description is required');
      return;
    }

    if (!formData.instructor.trim()) {
      setError('Instructor name is required');
      return;
    }

    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Course</h2>
          <button onClick={onClose} className="modal-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="e.g., Web Development Fundamentals"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseDescription">Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              placeholder="Describe the course content..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructor">Instructor Name</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
