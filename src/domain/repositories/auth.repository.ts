import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

//La palabra abstract define una clase que no podrá ser instanciada. Aqui solo definiremos reglas. 
export abstract class AuthRepository{

  //todo: abstract login()

  abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>

}