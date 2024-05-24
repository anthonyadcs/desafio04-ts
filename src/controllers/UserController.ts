import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.name || !user.email){
            return response.status(400).json({ message: 'Bad request! Name or email not filled in'})
        }

        this.userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'user created'})
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json( users )
    }

    deleteUser = (request: Request, response: Response) => {
        const user = request.body
        this.userService.deleteUser(user.name, user.email)
        return(response.status(202).json({ message: 'user deleted'}))
    }
}
