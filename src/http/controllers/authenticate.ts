import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeAuthenticaUseCase } from "../../services/factories/make-authenticate"

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
    const reqBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = reqBodySchema.parse(req.body)

    try {
        const authenticateUseCase = makeAuthenticaUseCase()

        await authenticateUseCase.execute({ email, password })
    } catch (error) {
        res.status(400).send()
    }

    return res.status(200).send()
}