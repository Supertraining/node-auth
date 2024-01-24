import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entities/user.entity';

//La palabra abstract define una clase que no podrá ser instanciada. Aqui solo definiremos reglas.
export abstract class AuthDataSource {
  //todo: abstract login()

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
  
}
