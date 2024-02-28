import { UserDataSource, UserEntity, UserRepository } from '../../domain';

export class UserRepositoryImpl implements UserRepository {
  
  constructor(private readonly userDatasource: UserDataSource) {}
  deleteById(id: string): Promise<object> {

    return this.userDatasource.deleteById(id);

  }
  getAll(): Promise<UserEntity | UserEntity[]> {
    return this.userDatasource.getAll();
  }
}
