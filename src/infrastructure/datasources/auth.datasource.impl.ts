import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import {
  AuthDataSource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { UserMapper } from '../mappers/user.mapper';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.notFound('User not found');

      const isPasswordCorrect = this.comparePassword(password, user.password);

      if (!isPasswordCorrect) throw CustomError.badRequest('Incorrect password');

      const userEntity = UserMapper.userEntityFromObject(user);
      if (Array.isArray(userEntity)) {
        throw CustomError.internalError('Unexpected multiple users found');
      }

      return userEntity;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalError();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, roles } = registerUserDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('User already exists');

      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
        roles: roles,
      });

      await user.save();

      const userEntity = UserMapper.userEntityFromObject(user);
      if (Array.isArray(userEntity)) {
        throw CustomError.internalError('Unexpected multiple users found');
      }

      return userEntity;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalError();
    }
  }

}
