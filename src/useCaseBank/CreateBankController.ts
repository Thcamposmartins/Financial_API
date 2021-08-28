import {Request, Response } from "express" 
import { ICreateUserRequestDTO } from "../useCaseUser/ICreateUserRequestDTO"
import { VerifyIfExistsAccounrCPF } from "../useCaseUser/verifyIfExistsAccountCPF"
import { IStatementOperationDTO } from "./IStatementOperationDTO"

export class CreateBankConstroller{
    
    async createDeposit(request: Request, response: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const {cpf} = request.headers
        const customer = await JSON.parse(VerifyIfExistsAccounrCPF(String(cpf),customers))

        const {description, amount } = request.body

        const statementOperation:IStatementOperationDTO = {
            description,
            amount,
            created_at: new Date(),
            type: "credit"
        }
        customer.statement.push(statementOperation)

        return response.status(201).json("Deposit operation was successful 🤑💲")
    }
}