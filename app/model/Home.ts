import { model, models, Schema } from "mongoose";

const HomeSchema = new Schema(
  {
    greeting: {
      type: String,
    },
    s_intro: {
      type: String,
    },
    intro: {
      type: String,
    },
    message: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    describe: {
      type: String,
    },
    tag: {
      type: [String],
    },
    image:{
      type:String,
    }
  },
  { timestamps: true }
);

export default models.Home || model("Home", HomeSchema);