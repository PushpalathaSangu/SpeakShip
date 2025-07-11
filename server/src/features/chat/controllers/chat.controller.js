import mongoose from 'mongoose';
import {
  getOrCreateChat,
  fetchMessages,
  sendMessage as saveMessage
} from '../services/chat.service.js';

// POST /api/chat/access
export const accessChat = async (req, res) => {
  try {
    const { deliveryOrderId, customerId, driverId } = req.body;

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(deliveryOrderId) ||
      !mongoose.Types.ObjectId.isValid(customerId) ||
      !mongoose.Types.ObjectId.isValid(driverId)
    ) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Get or create a new chat
    const chat = await getOrCreateChat(deliveryOrderId, customerId, driverId);

    res.status(200).json(chat);
  } catch (err) {
    console.error('❌ Error accessing chat:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/chat/:chatId/messages
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ error: 'Invalid Chat ID' });
    }

    const messages = await fetchMessages(chatId);

    res.status(200).json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// POST /api/chat/:chatId/messages
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { senderId, senderRole, content } = req.body;

    // Validate all input
    if (
      !mongoose.Types.ObjectId.isValid(chatId) ||
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !['customer', 'driver'].includes(senderRole) ||
      typeof content !== 'string' ||
      !content.trim()
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Save the message in DB
    const message = await saveMessage(chatId, senderId, content.trim(), senderRole);

    res.status(201).json(message);
  } catch (err) {
    console.error('❌ Error sending message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
