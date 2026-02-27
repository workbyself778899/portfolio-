import { model, models, Schema } from "mongoose";

const AboutSchema = new Schema({
    title:String,
    describe:String
})

export default models.About || model("About", AboutSchema);