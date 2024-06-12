import { Prisma } from "@prisma/client"
import { prisma } from "../lib/db"

export class PrismaUsers {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }

    // async updateOne(data: Prisma.UserUpdateInput) {
    //     const userUpdateOne = await prisma.user.update({
    //         where: {
    //             data
    //         }
            
    //     })
    // }

    async findOne(data: Prisma.UserFindUniqueOrThrowArgs) {
        data
    }
}