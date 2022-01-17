import { PrismaClient, Prisma, User } from '@prisma/client'
import { userInfo } from 'os';
import { domainToASCII } from 'url';

const prisma = new PrismaClient()

async function main() {
    const newUser = await prisma.user.create({ 
        data: {
            firstName: "Ozzie",
            lastName: "Esteban",
            email: ""
        },
        select:{
            id: true,
            email: true
        }
     })

     console.log("User creado: ", newUser);

     const allUsers = await prisma.user.findMany({
         select: { email: true }, 
     });

     console.log("All users: ")
     console.dir(allUsers, { depth: null })
}

main()
    .catch( e => { throw e })
    .finally( async () => await prisma.$disconnect() )