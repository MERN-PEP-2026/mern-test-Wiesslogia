import express from "express";
import {
  createCourse,
  getCourses,
  deleteCourse
} from "../controllers/course.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, createCourse);
router.get("/", auth, getCourses);
router.delete("/:id", auth, deleteCourse);

export default router;