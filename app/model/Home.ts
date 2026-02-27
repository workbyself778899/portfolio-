import { model, models, Schema } from "mongoose";

const HomeSchema = new Schema(
    {
        greeting : String,
        s_intro:String,
        intro:String,
        message:String,
        title:{
            required:true,
            type:String
        },
        describe:String,
        tag:[String]
    }
)

export default models.Home || model("Home", HomeSchema)