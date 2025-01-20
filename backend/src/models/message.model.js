import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
{
  sendeId: { 
    type:mongoose.Schema.Types.ObjectId,
    Ref: "User",
    required: true,
  },
  reciverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  Image: {
    type: String,
  },
},
{ timeseries: true}
);

const Message = mongoose.model("Message", messageSchema);
export default Message;