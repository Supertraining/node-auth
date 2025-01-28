import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";



interface GetUserByIdUseCase {
    execute(id:string): Promise<UserEntity>
}

export class GetUserById implements GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string): Promise<UserEntity> {
        const user = await this.userRepository.getById(id);
        return user;
    }
}