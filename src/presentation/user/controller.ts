import { Response, Request } from 'express';
import { CustomError, GetAllUsers, DeleteUserById, UserRepository, UserEntity } from '../../domain';
import { GetUserById } from '../../domain/use-cases/user/getUserById.user.use-case';
import { UpdateUser } from '../../domain/use-cases/user/updateUser.user.use-case';

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

  getUserById = (req: Request, res: Response) => {
    const id: string = req.params.id;
    new GetUserById(this.userRepository)
    .execute(id)
    .then((user) => res.json(user))
    .catch((error) => this.handleError(error, res));
  }

  updateUser = (req: Request, res: Response)=> {
    const id: string = req.params.id;
    const user: UserEntity = req.body;
    new UpdateUser(this.userRepository)
    .execute(id,user)
    .then((user) => res.json(user))
    .catch((error) => this.handleError(error, res));
  }

}
