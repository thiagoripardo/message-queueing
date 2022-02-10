import { Message } from "models/MessagesModel";
import MessagesRepository from "repositories/MessagesRepository";
import validateMessage from "validations/validateMessage";

export default class MessageService {
  private messagesRepository: MessagesRepository;

  constructor() {
    this.messagesRepository = new MessagesRepository();
  }

  public getMessagesRepository(): MessagesRepository {
    return this.messagesRepository;
  }

  public createMessage(message: Message): Promise<any> {
    validateMessage(message);
    return this.messagesRepository.createMessage(message);
  }

  public getMessages(): Promise<any> {
    return this.messagesRepository.getMessages();
  }

  public getMessageById(id: string): Promise<any> {
    return this.messagesRepository.getMessageById(id);
  }

  public updateMessageById(id: string, message: Message): Promise<any> {
    validateMessage(message);
    return this.messagesRepository.updateMessageById(id, message);
  }

  public deleteMessageById(id: string): Promise<any> {
    return this.messagesRepository.deleteMessageById(id);
  }
}
