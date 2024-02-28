
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';


interface GetAllUsersUseCase {
  execute(): Promise<UserEntity | UserEntity[]>;
}

export class GetAllUsers implements GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(): Promise<UserEntity | UserEntity[]> {
    const users = this.userRepository.getAll();
    return users;
  }
}
