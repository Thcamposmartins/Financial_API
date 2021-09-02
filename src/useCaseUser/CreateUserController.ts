import {Request, Response } from "express" 
import { ICreateUserRequestDTO } from "./ICreateUserRequestDTO"
import { uuid } from "uuidv4"
import { VerifyIfExistsAccounrCPF } from "./verifyIfExistsAccountCPF"

export class CreateUserConstroller{

    async createUser(request: Request, response: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const {name, cpf} = request.body   

        try{
            const costumerAlreadyExists = customers.some(
                (custumer)=>custumer.cpf===cpf
            ) 

            if(costumerAlreadyExists)
                return response.status(400).json({error: "Customer already exists! 🤦‍♂️"})
            customers.push({                                    
                cpf,
                name,
                id:uuid(),
                statement:[]
            })

            return response.status(201).json(customers)   

        }catch(err){
            return response.status(400).json({error: "Is not possible save the User 🤷‍♀️"})
        }
    }

    async getStatement(request: Request, response: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const {cpf} = request.headers
        const customer = await JSON.parse(VerifyIfExistsAccounrCPF(String(cpf),customers))

        return response.status(201).json({"Is statement exists 🙌":customer.statement})
    }

    async getStatementforDate(request: Request, response: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const {cpf} = request.headers
        const {date} = request.query
        const customer = await JSON.parse(VerifyIfExistsAccounrCPF(String(cpf),customers))
        
        const dateFormat = new Date(date + " 00:00")
        const statement = customer.statement.filter(
            (statement)=>
            statement.created_at.toDateString()===
            new Date(dateFormat).toDateString()
        )

        return response.json(statement)
    }

    async deleteAccount(request: Request, response: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const {cpf} = request.headers        
        const customer = await JSON.parse(VerifyIfExistsAccounrCPF(String(cpf),customers))
        
        customers.splice(customer,1)
        return response.status(200).json(customers)
    }
}