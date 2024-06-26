import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeRegisterUseCase } from "../../services/factories/make-register-use-case"

export async function register(req: FastifyRequest, res: FastifyReply) {
    const reqBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = reqBodySchema.parse(req.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.handle({ name, email, password })
    } catch (error) {
        res.status(409).send()
    }

    return res.status(201).send()
}