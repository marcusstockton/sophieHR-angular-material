import { Address } from "./Address";
import { Company } from "./Company";

export class EmployeeList {
    id:string;
    title:string;
    gender:string;
    firstName:string;
    middleName: string;
    lastName:string;
    workEmailAddress:string;
    personalEmailAddress:string;
    workPhoneNumber:string;
    workMobileNumber:string;
    personalMobileNumber:string;
    holidayAllowance:string;
    dateOfBirth:Date;
    startOfEmployment:Date;
    employeeAddress: Address
    departmentId:string
    companyId:string;
    department:{
        id: string;
        name:string;
    }
    company: Company
}