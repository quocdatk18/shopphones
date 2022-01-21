import express from 'express'
import { getAllUser, registerUser, login, DeleteUser, checkUser } from '../controllers/UserController.js'
const UserRouter = express.Router()
import { isAuth, isAdmin } from '../untils/until.js'

UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)

UserRouter.get('/', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)
UserRouter.get("/load-user", isAuth, checkUser)

export default UserRouter
