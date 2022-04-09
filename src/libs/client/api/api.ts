export * from './account.service';
import { AccountService } from './account.service';
export * from './companies.service';
import { CompaniesService } from './companies.service';
export * from './departments.service';
import { DepartmentsService } from './departments.service';
export * from './employees.service';
import { EmployeesService } from './employees.service';
export const APIS = [AccountService, CompaniesService, DepartmentsService, EmployeesService];
