import { Address } from "./Address";

export class Company {
    id: string;
    name: string;
    logo?: string;
    createdDate: Date;
    updatedDate: Date;
    employeeCount: number;
    address: Address;
}


