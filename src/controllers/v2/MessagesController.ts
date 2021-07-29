import { Request, Response } from "express";
import MessagesService from "services/v2/MessagesService";

export default class MessageController {
  private messageService: MessagesService;

  constructor() {
    this.messageService = new MessagesService();
  }

  public createMessage = (request: Request, response: Response): Response => {
    try {
      this.messageService.createMessage(request.body);
      return response.sendStatus(201);
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

  public updateMessageById = (
    request: Request,
    response: Response
  ): Response => {
    try {
      this.messageService.updateMessageById(request.params.id, request.body);
      return response.sendStatus(204);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  };

  public deleteMessageById = (
    request: Request,
    response: Response
  ): Response => {
    try {
      this.messageService.deleteMessageById(request.params.id);
      return response.sendStatus(204);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  };
}
