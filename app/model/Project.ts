import { model, models, Schema } from "mongoose";

const ProjectSchema = new Schema({
  title: String,
  description: String,
  tech: [String],
  github: String,
  demo: String,
  image: String,
  order: Number,
});

export default models.Project || model("Project", ProjectSchema);
