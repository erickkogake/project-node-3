import { hash } from "bcryptjs"
import { prisma } from "../lib/db"
import { PrismaUsers } from "../repositories/repository-users"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export async function RegisterUseCase({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userWithSameEmail) {
        throw new Error('E-mail já existe.')
    }

    const password_hash = await hash(password, 6)

    const prismaUsersCase = new PrismaUsers()

    await prismaUsersCase.create({
        email,
        name,
        password_hash
    })
}
