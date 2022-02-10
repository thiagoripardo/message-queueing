import Queue, { Queue as IQueue } from "bull";
import { redisBullConfig } from "configs/redis";
import MessagesRepository from "repositories/MessagesRepository";

export default class BullService {
  private messagesRepository: MessagesRepository;
  private createMessageQueue: IQueue;
  private updateMessageQueue: IQueue;
  private deleteMessageQueue: IQueue;

  constructor() {
    this.messagesRepository = new MessagesRepository();
    this.createMessageQueue = new Queue("createMessage", {
      redis: redisBullConfig,
    });
    this.updateMessageQueue = new Queue("updateMessage", {
      redis: redisBullConfig,
    });
    this.deleteMessageQueue = new Queue("deleteMessage", {
      redis: redisBullConfig,
    });

    this.createMessageQueue.process(async (job) => {
      try {
        const { message } = job.data;
        return await this.messagesRepository.createMessage(message);
      } catch (err) {
        console.error("createMessageQueue", err);
      }
    });

    this.updateMessageQueue.process(async (job) => {
      try {
        const { id, message } = job.data;
        return await this.messagesRepository.updateMessageById(id, message);
      } catch (err) {
        console.error("createMessageQueue", err);
      }
    });

    this.deleteMessageQueue.process(async (job) => {
      try {
        const { id } = job.data;
        return await this.messagesRepository.deleteMessageById(id);
      } catch (err) {
        console.error("createMessageQueue", err);
      }
    });
  }

  public getCreateMessageQueue() {
    return this.createMessageQueue;
  }

  public getUpdateMessageQueue() {
    return this.updateMessageQueue;
  }

  public getDeleteMessageQueue() {
    return this.deleteMessageQueue;
  }
}
