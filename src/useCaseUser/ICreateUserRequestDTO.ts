import { IStatementOperationDTO } from "useCaseBank/IStatementOperationDTO";

export interface ICreateUserRequestDTO{
    id:string,
    name: string,
    cpf: string,
    statement: IStatementOperationDTO[]
}