import { Document, Schema, Model, model } from "mongoose";

export interface Message extends Document {
  subject: String;
  body: String;
  wasReaded: Boolean;
}

const messageSchema = new Schema({
  subject: String,
  body: { 
    type: String, 
    required: true,
  },
  wasReaded: {
		type: Boolean,
		default: false
	},
  createdAt: {
		type: Date,
		default: Date.now
	},
  modifiedAt: {
		type: Date,
		default: Date.now
	},
});

const MessageModel: Model<Message> = model<Message>("messages", messageSchema);
export default MessageModel;