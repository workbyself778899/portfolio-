import { model, models, Schema } from "mongoose";

const SkillSchema = new Schema({
  categories: [
    {
      title: String,
      skills: [String],
    },
  ],
  techStack: [
    {
      name: String,
      icon: String,
      color: String,
    },
  ],
  description: String,
});

export default models.Skill || model("Skill", SkillSchema);
