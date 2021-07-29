import express from 'express';
import MessagesController from 'controllers/v1/MessagesController';

const route = express.Router();
const messagesController = new MessagesController();

route.post('/messages', messagesController.createMessage);
route.get('/messages', messagesController.getMessages);
route.get('/messages/:id', messagesController.getMessageById);
route.patch('/messages/:id', messagesController.updateMessageById);
route.delete('/messages/:id', messagesController.deleteMessageById);

export default route;