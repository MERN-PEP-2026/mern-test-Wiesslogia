import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: { 
        type: String, required: true 
    },
    courseDescription: { 
        type: String, required: true 
    },
    instructor: {
         type: String, required: true 
        }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);