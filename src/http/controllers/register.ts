import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "../../services/register"
import { PrismaUsers } from "../../repositories/prisma/repository-users"

export async function register(req: FastifyRequest, res: FastifyReply) {
    const reqBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = reqBodySchema.parse(req.body)

    try {
        const prismaUsers = new PrismaUsers();
        const registerUseCase = new RegisterUseCase(prismaUsers);

        await registerUseCase.handle({ name, email, password })
    } catch (error) {
        res.status(409).send()
    }

    return res.status(201).send()
}