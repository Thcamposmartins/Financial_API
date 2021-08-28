import {Request, Response } from "express" 
import { ICreateUserRequestDTO } from "./ICreateUserRequestDTO"
import { uuid } from "uuidv4"
import { VerifyIfExistsAccounrCPF } from "./verifyIfExistsAccountCPF"

export class CreateUserConstroller{

    async createUser( req: Request, res: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const {name, cpf} = req.body   
        try{
            const costumerAlreadyExists = customers.some(
                (custumer)=>custumer.cpf===cpf
            ) 

            if(costumerAlreadyExists)
                return res.status(400).json({error: "Customer already exists! 🤦‍♂️"})

            customers.push({                                    
                cpf,
                name,
                id:uuid(),
                statement: []
            })

            return res.status(201).json(customers)   

        }catch(err){
            return res.status(400).json({error: "Is not possible save the User 🤷‍♀️"})
        }
    }

    async getStatement(request: Request, response: Response, customers:ICreateUserRequestDTO []): Promise<Response>{
        const {cpf} = request.headers
        const customer = await JSON.parse(VerifyIfExistsAccounrCPF(String(cpf),customers))

        return response.status(201).json({"Is statement exists 🙌":customer.statement})
    }
}