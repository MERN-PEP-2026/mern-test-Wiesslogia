import Course from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, instructor } = req.body;

    if (!courseName || !courseDescription || !instructor) {
      return res.status(400).json({ 
        message: 'Course name, description, and instructor are required' 
      });
    }

    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    console.error('Create course error:', err);
    res.status(400).json({ message: err.message || 'Failed to create course' });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error('Get courses error:', err);
    res.status(400).json({ message: err.message || 'Failed to fetch courses' });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error('Delete course error:', err);
    res.status(400).json({ message: err.message || 'Failed to delete course' });
  }
};
