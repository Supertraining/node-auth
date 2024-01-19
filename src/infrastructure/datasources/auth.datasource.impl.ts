import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDataSource{
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    
    try {
      const { name, email, password } = registerUserDto;

      return new UserEntity(
        '1',
        name,
        email,
        password,
        ['ADMIN_ROLE'],
      );
      
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalError();
    }

  }

}