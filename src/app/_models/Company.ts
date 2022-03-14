export class Company {
    id: string;
    name: string;
    logo?: string;
    createdDate: Date;
    updatedDate: Date;
    employeeCount: number;
    address: {
        id: string;
        addressType: AddressType;
        line1: string;
        line2: string;
        line3: string;
        line4: string;
        postcode: string;
        county: string;
    }
}


export enum AddressType {
    Company,
    Employee
}