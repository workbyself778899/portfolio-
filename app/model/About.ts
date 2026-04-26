import { model, models, Schema } from "mongoose";

const AboutSchema = new Schema({
  title: String,
  describe: String,
  skills: [{ name: String, level: Number }],
});

export default models.About || model("About", AboutSchema);