import { ICreateUserRequestDTO } from "./ICreateUserRequestDTO"

export function VerifyIfExistsAccounrCPF(cpf:string,customers:ICreateUserRequestDTO []){

    const customer:ICreateUserRequestDTO = customers.find((customer)=> customer.cpf===cpf)
    if(!customers){
        return JSON.stringify({error: "Customer not found 👀"})
    }
    return JSON.stringify(customer)
}