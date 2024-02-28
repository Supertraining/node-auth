import { CustomError, UserEntity } from '../../domain';

export class UserMapper {
  static userEntityFromObject(user: any | any[]): UserEntity | UserEntity[] {
    if (Array.isArray(user)) {
      return user.map((user) => this.createUserEntity(user));
    } else {
      return this.createUserEntity(user);
    }
  }

  private static createUserEntity(user: any): UserEntity {
    const { id, _id, name, email, password, roles } = user;

    if (!_id || !id) throw CustomError.badRequest('Missing id at user entity');
    if (!name) throw CustomError.badRequest('Missing name at user entity');
    if (!email) throw CustomError.badRequest('Missing email at user entity');
    if (!password) throw CustomError.badRequest('Missing password at user entity');
    if (!roles) throw CustomError.badRequest('Missing roles at user entity');

    return new UserEntity(_id || id, name, email, password, roles);
  }
}
