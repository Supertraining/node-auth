import { UserEntity } from "../entities/user.entity";


export abstract class UserDataSource {

abstract getAll(): Promise<UserEntity | UserEntity[]>;

}

