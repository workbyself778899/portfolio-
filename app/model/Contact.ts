import { model, models, Schema } from "mongoose";

const ContactSchema = new Schema({
  email: String,
  location: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
  },
  contactText: String,
  availability: String,
});

export default models.Contact || model("Contact", ContactSchema);
