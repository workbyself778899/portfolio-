import { model, models, Schema } from "mongoose";

const ResumeSchema = new Schema({
  sections: [
    {
      type: String,
      items: [
        {
          title: String,
          org: String,
          period: String,
          description: String,
        },
      ],
    },
  ],
  cvUrl: String,
  downloadText: String,
  description: String,
});

export default models.Resume || model("Resume", ResumeSchema);
