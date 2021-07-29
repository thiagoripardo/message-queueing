import { Message } from "models/MessagesModel";

const validateMessage = (message: Message): void => {
  const {
    body
  } = message;

  if (!body) {
    throw new Error('body is required');
  }
}

export default validateMessage;