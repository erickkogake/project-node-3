import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";

interface AuthenticateUseCaseReq {
    email: string
    password: string
}

interface AuthenticateUseCaseReply {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRepository: UsersRepository) { }

    async execute({ email, password }: AuthenticateUseCaseReq): Promise<AuthenticateUseCaseReply> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new Error('Invalid credentials')
        }

        const passwordMatches = await compare(password, user.password_hash)

        if (!passwordMatches) {
            throw new Error('Invalid credentials')
        }

        return {
            user
        }
    }
}