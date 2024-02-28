import { UserRepository } from '../../repositories/user.repository';

interface deleteUserByIdUseCase {
  execute(id:string): Promise<object>;
}

export class DeleteUserById implements deleteUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  execute(id: string): Promise<object> {
    const isUserDeleted = this.userRepository.deleteById(id);
    return isUserDeleted;
  }
}
