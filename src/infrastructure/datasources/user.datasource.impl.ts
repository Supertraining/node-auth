import { UserDataSource, UserEntity, CustomError } from '../../domain';
import { UserMapper } from '../mappers/user.mapper';
import { UserModel } from '../../data/mongodb';
export class UserDatasourceImpl implements UserDataSource {
  async getAll(): Promise<UserEntity | UserEntity[]> {
    try {
      const users = await UserModel.find();
      return UserMapper.userEntityFromObject(users);
    } catch (error) {
      throw CustomError.internalError();
    }
  }
}
