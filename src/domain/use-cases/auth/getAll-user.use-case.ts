import { AuthRepository } from '../../repositories/auth.repository';
import { UserEntity } from '../../entities/user.entity';


interface GetAllUsersUseCase {
  execute(): Promise<UserEntity | UserEntity[]>;
}

export class GetAllUsers implements GetAllUsersUseCase {
  constructor(private readonly authRepository: AuthRepository) {}
  async execute(): Promise<UserEntity | UserEntity[]> {
    const users = this.authRepository.getAll();
    return users;
  }
}
