import mongoose from "mongoose";

const NewDevSchema = mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  technology: {
    type: String,
    require: true,
  },
  Image: {
    type: String,
    require: true,
  },
  createdAt: { type: Date, Date: new Date() }
});

const AddDevMessage = mongoose.model("AddDevMessage", NewDevSchema);

export default AddDevMessage;
