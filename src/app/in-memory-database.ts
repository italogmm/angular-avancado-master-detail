import {InMemoryDbService} from "angular-in-memory-web-api";

export class InMemoryDatabase implements InMemoryDbService{

    createDb(){
        const categories = [
            {id: 1, name: "Moradia", description: "Pagamentos de contas da casa"},
            {id: 2, name: "Saúde", description: "Plano de Saúde e remédios"},
            {id: 3, name: "Lazer", description: "Cinemas, parques, praia, etc"},
            {id: 4, name: "Salário", description: "Recebimento de Salário"},
            {id: 5, name: "Freelas", description: "Trabalhos como freelance"},
        ];
        return { categories };
    }

}