import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService, EmployeeDetailDto, EmployeeListDto, EmployeesService, GuidStringKeyValuePair } from 'src/libs/client';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  imageSrc: any;
  public editing: boolean = false;
  public loading:boolean = false;
  public companies: GuidStringKeyValuePair[];
  public companyId: string = '';

  public userForm: FormGroup = this.fb.group({
    firstName: [null, [Validators.required]],
    middleName:[null],
    lastName: [null, [Validators.required]],
    userName:[null, [Validators.required]],
    title:[null, [Validators.required]],
    gender:[null, [Validators.required]],
    workEmailAddress:[null, [Validators.required]],
    personalEmailAddress:[null],
    workPhoneNumber:[null],
    workMobileNumber:[null],
    phoneNumber:[null],
    personalMobileNumber:[null],
    jobTitle:[null, [Validators.required]],
    holidayAllowance:[null, [Validators.required]],
    dateOfBirth:[null, [Validators.required]],
    startOfEmployment:[null, [Validators.required]],
    address:this.fb.group({
      line1: [null, [Validators.required]],
      line2: [null],
      line3: [null],
      line4: [null],
      postcode: [null, [Validators.required]],
      county: [null, [Validators.required]],
    }),
    managerId:[null, [Validators.required]],
    avatar: [null, [Validators.required]],
    departmentId:[null],
    companyId: [null, [Validators.required]]
  });
  titles: any;
  managers: EmployeeListDto[];

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private employeeService: EmployeesService,
    private companyService: CompaniesService,
    private sanitizer: DomSanitizer
    ) { }

  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
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
    this.companyService.apiCompaniesGetCompanyNamesForSelectGet().subscribe((result)=>{
      this.companies = result;
      if(result.length === 1){
        this.userForm.controls['companyId'].setValue(result[0].value);
        this.getManagersForComany(result[0].key!);
      }
    })

    this.employeeService.apiEmployeesGetTitlesGet().subscribe((result)=>{
      this.titles = result;
    })
    this.loading = false;

    const id = this.route.snapshot.paramMap.get('userid');
    if(id){
      this.loading = true;
      this.editing = true;
      console.log(id);
      this.employeeService.apiEmployeesGetByIdIdGet(id).subscribe((user: EmployeeDetailDto)=>{

        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64, " + user.avatar?.avatar);
        this.userForm.patchValue({...user})
        this.loading = false;
      })
    }
  }
  companyChange(){
    this.userForm.controls['companyId'].setValue(this.companies.find(x=>x.key == this.companyId));  
    console.log("CompanyId:" + this.companyId);

    this.getManagersForComany(this.companyId);
  }

  private getManagersForComany(companyId: string){
    this.employeeService.apiEmployeesListOfManagersForCompanyCompanyIdGet(companyId).subscribe((result)=>{
      this.managers = result;
    });
  }
    
}
