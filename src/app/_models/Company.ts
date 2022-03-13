export class Company{
    id: string;
    name: string;
    logo?: string;
    createdDate:Date;
    updatedDate:Date;
    address: {
        line1: string;
        line2: string;
        line3:string;
        line4:string;
        postcode:string;
        county:string;
    }
}