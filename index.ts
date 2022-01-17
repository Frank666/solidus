import { PrismaClient } from '@prisma/client'
import express from 'express'
import _ from 'lodash'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

//* 1. Fetches all active users.
app.get('/activeUsers', async (req, res) => {
    const songs = await prisma.user.findMany({
        select: { status: true },
    })
    res.json({
        success: true,
        payload: songs,
    })
})

//* 2. Fetches a specific user by its ID.
app.get(`/user/:id`, async (req, res) => {
    const { id } = req.params
    if(_.isNil(id) || Number(id) <= 0 ){
        return res.json({
            success: false,
            payload: null,
            message: `API SAYS: Id value not valid, please check`,
        });
    }
    const userSelected = await prisma.user.findFirst({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: userSelected,
    })
})

//* 3. Creates a new user.
app.post(`/user`, async (req, res) => {
    if(_.isNil(req.body)){
        return res.json({
            success: false,
            payload: null,
            message: `API SAYS: User values not valid, please check`,
        });
    }
    if(_.isNil(req.body.firstName) || _.isNil(req.body.lastName) ){
        return res.json({
            success: false,
            payload: null,
            message: `API SAYS: User names cannot be null, please check`,
        });
    }
    const result = await prisma.user.create({
        data: { ...req.body },
    })
    res.json({
        success: true,
        payload: result,
    })
})

//* 4. Deletes a user by ID.
app.delete(`/user/:id`, async (req, res) => {
    const { id } = req.params
    if(_.isNil(id) || _.isNaN(id) || Number(id) <= 0 ){
        return res.json({
            success: false,
            payload: null,
            message: `API SAYS: Id value not valid, please check`,
        });
    }
    const deleleUser = await prisma.user.delete({
        where: { id: Number(id) },
    })
    res.json({
        success: true,
        payload: deleleUser,
    })
})

//* 5. Fetches all users.
app.get('/users', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    res.json({
        success: true,
        payload: allUsers,
    })
})

app.use((req, res, next) => {
    res.status(404);
    return res.json({
        success: false,
        payload: null,
        message: `API SAYS: Endpoint not found for path: ${req.path}`,
    });
});

// #6
app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)