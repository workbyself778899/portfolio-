import { model, models, Schema } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.ContactMessage || model("ContactMessage", ContactMessageSchema);
