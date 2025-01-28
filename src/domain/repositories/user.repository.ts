import { UserEntity } from "../entities/user.entity";


export abstract class UserRepository {

  abstract deleteById(id:string): Promise<object>;
  
  abstract getAll(): Promise<UserEntity | UserEntity[]>;

  abstract getById(id:string): Promise<UserEntity>

  abstract update(id:string, user: UserEntity): Promise<UserEntity>

}
