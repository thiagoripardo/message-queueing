import _ from 'lodash';
import MessageSchema, { Message } from "models/MessagesModel";
import RedisService from "services/RedisService";
export default class MessageRepository {
  private messageSchema = MessageSchema;
  private redisService = new RedisService();
  private redisKeys = this.redisService.getKeys();

  private mappingMessagesToRedis(messages: any[] | any) {
    let messagesMapped: any = {};

    messages?.forEach((message: { _id: any; }) => {
      messagesMapped[`${message._id}`] = JSON.stringify(message);
    });

    return messagesMapped;
  }

  public async createMessage(message: Message): Promise<Message | null> {
    const messageCreated =  await this.messageSchema.create(message);

    try {
      await this.redisService.hset(this.redisKeys.messages, messageCreated._id, messageCreated);
    } catch (err) {
      console.error('createMessage', err);
    }
    
    return messageCreated;
  }

  public async getMessages(): Promise<any[] | null> {
    try {
      let messages = await this.redisService.hgetall(this.redisKeys.messages);

      if (!messages) {
        messages = await this.messageSchema.find({}).lean();

        const messagesMapped = this.mappingMessagesToRedis(messages);

        if (!_.isEmpty(messagesMapped)) {
          try {
            await this.redisService.hmset(this.redisKeys.messages, messagesMapped);
          } catch (err) {
            console.error('getMessages', err);
          }
        }
      }

      return messages;
    } catch (err) {
      console.error('getMessages', err);
      return await this.messageSchema.find({}).lean();
    }
  }

  public async getMessageById(id: String): Promise<any | null> {
    try {
      let message = await this.redisService.hget(this.redisKeys.messages, id);

      if (!message) {
        message = await this.messageSchema.findById(id).lean();

        if (message) {
          try {
            await this.redisService.hset(this.redisKeys.messages, id, message);
          } catch (err) {
            console.error('getMessageById', err);
          }
        }
      }

      return message;
    } catch (err) {
      console.error('getMessageById', err);
      return await this.messageSchema.findById(id).lean();
    }
  }

  public async findOneAndUpdate(
    id: String,
    message: Message
  ): Promise<any | null> {
    return this.messageSchema
      .findOneAndUpdate(
        {
          _id: String(id),
        },
        {
          $set: message,
        },
        {
          new: true,
        }
      )
      .lean();
  }

  public async deleteOne(id: any): Promise<any | void> {
    return this.messageSchema.deleteOne({
      _id: id,
    });
  }

  public async updateMessageById(
    id: String,
    message: Message
  ): Promise<any | null> {
    const messageUpdated = await this.findOneAndUpdate(id, message);

    try {
      await this.redisService.hset(this.redisKeys.messages, messageUpdated._id, messageUpdated);
    } catch (err) {
      console.error('updateMessageById', err);
    }

    return messageUpdated;
  }

  public async deleteMessageById(id: String): Promise<any | void> {
    const deletedInfo = await this.deleteOne(id);

    try {
      await this.redisService.hdel(this.redisKeys.messages, id);
    } catch (err) {
      console.error('deleteMessageById', err);
    }

    return deletedInfo;
  }
}
