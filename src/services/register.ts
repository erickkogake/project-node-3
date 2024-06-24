import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {
    private usersRepository: any;

    constructor(usersRepository: any) {
        this.usersRepository = usersRepository
    }

    async handle({ name, email, password }: RegisterUseCaseRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('E-mail já existe.')
        }

        const password_hash = await hash(password, 6)

        await this.usersRepository.create({
            email,
            name,
            password_hash
        })
    }
}
