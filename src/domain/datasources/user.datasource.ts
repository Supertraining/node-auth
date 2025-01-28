import { UserEntity } from "../entities/user.entity";


export abstract class UserDataSource {

  abstract getAll(): Promise<UserEntity | UserEntity[]>;
  
  abstract getById(id: string) : Promise<UserEntity>;
  
  abstract deleteById(id: string): Promise<object>;

  abstract update(id: string, user: UserEntity): Promise<UserEntity>;

}

