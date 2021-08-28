import {Router} from 'express'
import { ICreateUserRequestDTO } from '../useCaseUser/ICreateUserRequestDTO'
import { CreateUserConstroller } from '../useCaseUser/CreateUserController'
import { CreateBankConstroller } from '../useCaseBank/CreateBankController'

const router = Router()
const customers:ICreateUserRequestDTO [] = []

const createUserConstroller = new CreateUserConstroller()
const createBankConstroller = new CreateBankConstroller()

router.post('/account', (request, response)=>{
    return createUserConstroller.createUser(request, response,customers)
})

router.get('/statement',(request, response)=>{
    return createUserConstroller.getStatement(request, response,customers)
})

router.post('/deposit',(request, response)=>{
    return createBankConstroller.createDeposit(request, response,customers)
})

//Middleware
// export function VerifyIfExistsAccounrCPF(request, response, next){
//     const {cpf} = request.headers

//     const customer:ICreateUserRequestDTO = customers.find((customer)=> customer.cpf===cpf)
//     if(!customers){
//         return response.status(400).json({error: "Customer not found 👀"})
//     }
//     request.customer = customer

//     return next()
// }
export {router}