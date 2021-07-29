import { Request, Response } from "express";
import MessagesService from "services/v1/MessagesService";

export default class MessageController {
  private messageService: MessagesService;

  constructor() {
    this.messageService = new MessagesService();
  }

  public createMessage = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    try {
      const createdMessage = await this.messageService.createMessage(
        request.body
      );
      return response.status(201).json(createdMessage);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  };

  public getMessages = async (
    _request: Request,
    response: Response
  ): Promise<Response | void> => {
    try {
      const messages = await this.messageService.getMessages();
      if (messages.length > 0) return response.json(messages);
      return response.sendStatus(404);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  };

  public getMessageById = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    try {
      const message = await this.messageService.getMessageById(
        request.params.id
      );
      if (message) return response.json(message);
      return response.sendStatus(404);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  };

  public updateMessageById = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    try {
      const updatedMessage = await this.messageService.updateMessageById(
        request.params.id,
        request.body
      );
      if (updatedMessage) return response.json(updatedMessage);
      return response.sendStatus(404);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  };

  public deleteMessageById = async (
    request: Request,
    response: Response
  ): Promise<Response | void> => {
    try {
      const deletedMessageInfo = await this.messageService.deleteMessageById(request.params.id);
      return response.json(deletedMessageInfo);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  };
}
