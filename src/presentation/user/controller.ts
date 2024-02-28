import { Response, Request } from 'express';
import { CustomError, GetAllUsers, DeleteUserById, UserRepository } from '../../domain';

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log('CONTROLLER ERROR HANDLER:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  getUsers = (req: Request, res: Response) => {
    new GetAllUsers(this.userRepository)
      .execute()
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  };

  deleteUserById = (req: Request, res: Response) => {
    const id: string = req.params.id;
    new DeleteUserById(this.userRepository)
      .execute(id)
      .then((isUserDeleted) => res.json(isUserDeleted))
      .catch((error) => this.handleError(error, res));
  };
}
