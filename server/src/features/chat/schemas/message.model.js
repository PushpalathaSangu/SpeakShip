//server/src/features/chat/schemas/message.model.js
import mongoose from 'mongoose';

// server/src/features/chat/schemas/message.model.js
const messageSchema = new mongoose.Schema({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderRole: { type: String, enum: ['customer', 'driver'], required: true },
  senderName: { type: String, required: false },
  content: { type: String, required: true },
}, { timestamps: true });


export default mongoose.model('Message', messageSchema);
