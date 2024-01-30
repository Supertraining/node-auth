import { UserDataSource, UserEntity, UserRepository } from '../../domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDataSource) {}
  getAll(): Promise<UserEntity | UserEntity[]> {
    return this.userDatasource.getAll();
  }
}
