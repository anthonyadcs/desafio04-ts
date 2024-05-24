import { makeMockRequest } from "./../__mocks__/mockRequest.mock";
import { MockResponse } from "./../__mocks__/mockResponse.mock";
import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn(),
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'user created' })
    })

    it('Deve retornar uma mensagem de erro se nome ou email não forem informados', () => {
        const mockRequest = {
            body: {
                name: 'aaaa',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name or email not filled in'})
    })

    describe('getAllUsers', () => {
        it('deve chamar a função getAllUsers', () => {
            const mockRequest = {body: {} } as Request
            const mockResponse = makeMockResponse()
            userController.getAllUsers(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(200)
        })
    })

    describe('deleteUser', () => {
        it('deve excluir o usuário informado', () => {
            const mockRequest = {body: {
                name: "req test",
                email: "reqtest@example.com",
            }} as Request;

            const mockResponse = makeMockResponse();

            userController.deleteUser(mockRequest, mockResponse)
            expect(mockResponse.state.status).toBe(202)
            expect(mockResponse.state.json).toMatchObject({message: 'user deleted'})
        })
    })
})

