import { Address } from "../Address"

export class EmployeeDetailDto{
    id:string
    userName:string
    firstName:string
    middleName:string
    lastName:string
    workEmailAddress:string
    personalEmailAddress:string
    workPhoneNumber:string
    workMobileNumber:string
    personalMobileNumber:string
    jobTitle:string
    holidayAllowance:number
    dateOfBirth:Date
    startOfEmployment:Date
    address:Address
    managerId:string
    avatar: AvatarDetail
    department:Department
}

export class AvatarDetail{
    id: string
    avatar:string
    createdDate:Date
    updatedDate:Date
}

export class Department{
    id:string
    name:string
}