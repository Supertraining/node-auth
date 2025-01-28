import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


interface UpdateUserUseCase {
    execute(id:string, user:UserEntity): Promise<UserEntity>
}

export class UpdateUser implements UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository){}

    async execute(id:string, user: UserEntity): Promise<UserEntity> {
        const updatedUser = await this.userRepository.update(id,user);
        return updatedUser;
    }

}