import {Request, Response } from "express" 
import { ICreateUserRequestDTO } from "../useCaseUser/ICreateUserRequestDTO"
import { VerifyIfExistsAccounrCPF } from "../useCaseUser/verifyIfExistsAccountCPF"
import { IStatementOperationDTO } from "./IStatementOperationDTO"

export class CreateBankConstroller{
    
    async createDeposit(request: Request, response: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const { description, amount } = request.body
        const {cpf} = request.headers        
        const customer = await JSON.parse(VerifyIfExistsAccounrCPF(String(cpf),customers))

        const statementOperation:IStatementOperationDTO = {
            description,
            amount,
            created_at: new Date(),
            type: "credit"
        }
        customer.statement.push(statementOperation)
        customers.splice(customer,1)
        customers.push(customer)

       return response.status(201).json("Deposit operation was successful 🤑")
    }

    async createWithdraw(request: Request, response: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const { amount } = request.body
        const {cpf} = request.headers        
        const customer = await JSON.parse(VerifyIfExistsAccounrCPF(String(cpf),customers))
        
        // //buscar por cpf e atualizar o array 

        const balance = getBalance(customer.statement)

        if(balance<amount)
            return response.status(400).json("Insufficient funds! 😪")
        
        const statementOperation:IStatementOperationDTO = {
            description: 'Withdraw',
            amount,
            created_at: new Date(),
            type: "debit"
        }
        customer.statement.push(statementOperation)
        customers.splice(customer,1)
        customers.push(customer)

       return response.status(201).json("Withdraw operation was successful 💲")
    }

}
    export function getBalance(statement:any) {
        const balance = statement.reduce((acc,operation)=>{
            if (operation.type === 'credit'){
                return acc + operation.amount
            }
            return acc - operation.amount
        },0)
        
        return balance
    }