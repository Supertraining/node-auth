import { UserEntity } from "../entities/user.entity";


export abstract class UserRepository {

abstract getAll(): Promise<UserEntity | UserEntity[]>;

}
