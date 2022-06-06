import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CompaniesClient, DepartmentDetailDto, DepartmentsClient, EmployeeAddress, EmployeeCreateDto, EmployeeDetailDto, EmployeeListDto, EmployeesClient, KeyValuePairOfGuidAndString } from 'src/app/client';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  imageSrc: any;
  public editing: boolean = false;
  public loading: boolean = false;
  public companies: KeyValuePairOfGuidAndString[];
  public companyId: string = '';

  public userForm: FormGroup = this.fb.group({
    firstName: [null, [Validators.required]],
    middleName: [null],
    lastName: [null, [Validators.required]],
    userName: [null, [Validators.required]],
    title: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    workEmailAddress: [null, [Validators.required, Validators.email]],
    personalEmailAddress: [null, [Validators.email]],
    workPhoneNumber: [null],
    workMobileNumber: [null],
    phoneNumber: [null],
    personalMobileNumber: [null],
    jobTitle: [null, [Validators.required]],
    holidayAllowance: [null, [Validators.required, Validators.min(0), Validators.max(60)]],
    dateOfBirth: [null, [Validators.required]],
    startOfEmployment: [null, [Validators.required]],
    address: this.fb.group({
      line1: [null, [Validators.required]],
      line2: [null],
      line3: [null],
      line4: [null],
      postcode: [null, [Validators.required]],
      county: [null, [Validators.required]],
    }),
    managerId: [null, [Validators.required]],
    avatar: [null, [Validators.required]],
    departmentId: [null],
    companyId: [null, [Validators.required]],
    passportNumber: [null],
    nationalInsuranceNumber:[null]
  });
  titles: any;
  managers: EmployeeListDto[];
  departments: DepartmentDetailDto[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeesClient,
    private companyService: CompaniesClient,
    private deptService: DepartmentsClient,
    private sanitizer: DomSanitizer
  ) { }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.userForm.patchValue({
          avatar: file
        });

      };

    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.companyService.getCompanyNames().subscribe((result) => {
      this.companies = result;
      if (result.length === 1) {
        this.userForm.controls['companyId'].setValue(result[0].key);
        this.getManagersForComany(result[0].key!);
        this.loading=false;
      }
    })
    this.employeeService.getTitles().subscribe((result) => {
      this.titles = result;
    });

    this.loading = false;

    const id = this.route.snapshot.paramMap.get('userid');
    if (id) {
      this.loading = true;
      this.editing = true;
      console.log(id);

      this.employeeService.getEmployee(id).subscribe((user: EmployeeDetailDto) => {
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64, " + user.avatar?.avatar);
        this.userForm.patchValue({ ...user })
        this.loading = false;
      });
    }
  }
  companyChange() {
    this.userForm.controls['companyId'].setValue(this.companies.find(x => x.key == this.companyId));
    console.log("CompanyId:" + this.companyId);

    this.getManagersForComany(this.companyId);
    this.getDepartmentsForCompany(this.companyId);
  }

  private getManagersForComany(companyId: string) {
    this.employeeService.getManagersForCompanyId(companyId).subscribe((result: EmployeeListDto[]) => {
      this.managers = result;
    });
  }

  private getDepartmentsForCompany(companyId:string): void{
    this.deptService.getDepartmentsByCompanyId(companyId).subscribe((depts: DepartmentDetailDto[])=>{
      this.departments = depts;
    })
  }

  submit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    console.log(form.value);
    var address = new EmployeeAddress({...form.value.address});
    var ef2 = new EmployeeCreateDto({...form.value});
    ef2.address = address;
    this.employeeService.postEmployee(ef2).subscribe((result)=>{
      // On success, add the avatar...
      
      console.log(result);
    }, (err)=>{
      alert(err);
    });
  }


}
