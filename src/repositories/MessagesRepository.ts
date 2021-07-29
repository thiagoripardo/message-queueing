import MessageSchema, { Message } from 'models/MessagesModel'

export default class MessageRepository {
  private messageSchema = MessageSchema;

  public async createMessage(message: Message): Promise<Message | void> {
    return await this.messageSchema.create(message);
  }

  public async getMessages(): Promise<Message[]> {
    return await this.messageSchema.find({}).lean();
  }

  public async getMessageById(id: String): Promise<Message | null> {
    return await this.messageSchema.findById(id).lean();
  }

  public async updateMessageById(id: String, message: Message): Promise<any | void> {
    return await this.messageSchema.findOneAndUpdate({
      '_id': String(id)
    }, {
      $set: message
    }, {
      new: true
    }).lean();
  }

  public async deleteMessageById(id: String): Promise<any | void> {
    return await this.messageSchema.deleteOne({
      '_id': id
    });
  }
}