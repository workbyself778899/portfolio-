import { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["experience", "education"],
      required: true,
    },
    title: { type: String, required: true },          // Role / Degree
    organization: { type: String, required: true },   // Company / School
    startDate: { type: String, required: true },      // "Jan 2024"
    endDate: { type: String, default: "Present" },
    description: { type: String },
    location: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Experience ||
  model("Experience", ExperienceSchema);