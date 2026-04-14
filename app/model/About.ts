import { model, models, Schema } from "mongoose";

const AboutSchema = new Schema({
  title: String,
  describe: String,
  timeline: [
    {
      title: String,
      institution: String,
      period: String,
      description: String,
    },
  ],
  skills: [{ name: String, level: Number }],
});

export default models.About || model("About", AboutSchema);