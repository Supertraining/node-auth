import { UserDataSource, UserEntity, CustomError } from '../../domain';
import { UserMapper } from '../mappers/user.mapper';
import { UserModel } from '../../data/mongodb';
export class UserDatasourceImpl implements UserDataSource {
  async deleteById(id: string): Promise<object> {
    try {
      const isUserDeleted = await UserModel.deleteOne({ _id: id });
      return isUserDeleted;
    } catch (error) {
      throw CustomError.internalError();
    }
  }

  async getAll(): Promise<UserEntity | UserEntity[]> {
    try {
      const users = await UserModel.find();
      return UserMapper.userEntityFromObject(users);
    } catch (error) {
      throw CustomError.internalError();
    }
  }

  async getById(id: string): Promise<UserEntity> {
    try {
      const user = await UserModel.findById(id);
      if(!user) throw CustomError.notFound('User not found');
      const mappedUser = UserMapper.userEntityFromObject(user);
      if(Array.isArray(mappedUser)) throw CustomError.internalError('Unexpected multiple users found');
      return mappedUser;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalError();
    }
   }

   async update(id: string, user: UserEntity): Promise<UserEntity> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
      if(!updatedUser) throw CustomError.notFound('User not found');
      const mappedUser = UserMapper.userEntityFromObject(updatedUser);
      if(Array.isArray(mappedUser)) throw CustomError.internalError('Unexpected multiple users found');
      return mappedUser;
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalError();
    }
   }
}
