import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseReq {
    userId: string
}

interface GetUserProfileUseCaseReply {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private userRepository: UsersRepository) { }

    async execute({ userId }: GetUserProfileUseCaseReq): Promise<GetUserProfileUseCaseReply> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new Error('Invalid credentials')
        }

        return {
            user
        }
    }
}