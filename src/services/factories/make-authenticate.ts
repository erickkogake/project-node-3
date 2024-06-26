import { PrismaUsers } from "../../repositories/prisma/repository-users";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticaUseCase() {
    const prismaUsers = new PrismaUsers();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsers);

    return authenticateUseCase
}