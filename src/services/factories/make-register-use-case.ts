import { PrismaUsers } from "../../repositories/prisma/repository-users";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
    const prismaUsers = new PrismaUsers();
    const registerUseCase = new RegisterUseCase(prismaUsers);

    return registerUseCase
}