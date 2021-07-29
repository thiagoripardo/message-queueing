import { Message } from 'models/MessagesModel';
import MessagesRepository from 'repositories/MessagesRepository';
import BullService from '../BullService';
import bullOptions from 'configs/bull';
import validateMessage from 'validations/validateMessage';

export default class MessageService {
  private messagesRepository: MessagesRepository;
  private bullService: BullService;

  constructor() {
      this.messagesRepository = new MessagesRepository();
      this.bullService = new BullService();
  }

  public getMessagesRepository(): MessagesRepository {
    return this.messagesRepository;
  }

  public createMessage(message: Message): void {
    validateMessage(message);
    this.bullService.getCreateMessageQueue().add({ message }, bullOptions);
  }

  public getMessages(): Promise<any> {
    return this.messagesRepository.getMessages();
  }

  public getMessageById(id: String): Promise<any> {
    return this.messagesRepository.getMessageById(id);
  }

  public updateMessageById(id: String, message: Message): void {
    validateMessage(message);
    this.bullService.getUpdateMessageQueue().add({ id, message }, bullOptions);
  }

  public deleteMessageById(id: String): void {
    this.bullService.getDeleteMessageQueue().add({ id }, bullOptions);
  }

  
}