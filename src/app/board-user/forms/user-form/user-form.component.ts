import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompaniesClient, DepartmentDetailDto, DepartmentsClient, EmployeeAddress, EmployeeAvatarDetail, EmployeeCreateDto, EmployeeDetailDto, EmployeeListDto, EmployeesClient, FileParameter, KeyValuePairOfGuidAndString } from 'src/app/client';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RandomUser } from 'src/app/models/RandomUser';
import { Name } from '../../../models/RandomUser';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  imageSrc: any;
  userForm: FormGroup;
  public editing: boolean = false;
  public loading: boolean = false;
  public companies: KeyValuePairOfGuidAndString[];
  public companyId: string = '';
  filteredOptions: Observable<any> | undefined;
  gettingTitles: boolean = false;

  titles: string[];
  managers: EmployeeListDto[] = [];
  departments: DepartmentDetailDto[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeesClient,
    private companyService: CompaniesClient,
    private deptService: DepartmentsClient,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {

  }

  public onValueChanged() {
    this.filteredOptions = this.userForm.controls['jobTitle'].valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        if (val && this.userForm.controls['jobTitle'].dirty) {
          return this.filter(val)
        }
        return "";
      })
    );
    this.gettingTitles = false;
  }

  filter(val: string): Observable<any> {
    this.gettingTitles = true;
    return this.employeeService.jobTitleAutoComplete(val)
      .pipe(
        map(response => response.filter(option => {
          return option;
        }, this.gettingTitles = false))
      );

  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        const formData = new FormData();
        formData.append("avatar", file);
        if (this.editing) {

          const id = this.route.snapshot.paramMap.get('userid');
          this.http.post(`https://localhost:7189/api/Employees/${id}/upload-avatar`, formData).subscribe({
            next: res => {
              console.log(res);
            }, error: err => console.log(err)
          })
        }
        this.userForm.controls['avatar'].setValue(formData);
      };
    }
  }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      id: [null],
      firstName: [null, [Validators.required]],
      middleName: [null],
      lastName: [null, [Validators.required]],
      username: [null, [Validators.required]],
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
      address: this.formBuilder.group({
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
      passportNumber: [null, []],
      nationalInsuranceNumber: [null, [Validators.pattern("^[A-Z]{0,2}[0-9]{0,6}[A-Z]{0,1}?$")]]
    });

    this.onValueChanged();

    this.loading = true;
    this.companyService.getCompanyNames().subscribe((result) => {
      this.companies = result;
      if (result.length === 1) {
        this.userForm.controls['companyId'].setValue(result[0].key);
        this.getManagersForComany(result[0].key!);
        this.loading = false;
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

      this.employeeService.getEmployee(id).subscribe({
        next: user => {
          this.imageSrc = this.sanitizer.bypassSecurityTrustUrl("data:image/png;base64, " + user.avatar?.avatar);
          this.userForm.patchValue({
            id: user.id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            username: user.userName,
            title: user.title,
            gender: user.gender,
            workEmailAddress: user.workEmailAddress,
            personalEmailAddress: user.personalEmailAddress,
            workPhoneNumber: user.workPhoneNumber,
            workMobileNumber: user.workMobileNumber,
            phoneNumber: user.phoneNumber,
            personalMobileNumber: user.personalMobileNumber,
            jobTitle: user.jobTitle,
            holidayAllowance: user.holidayAllowance,
            dateOfBirth: user.dateOfBirth,
            startOfEmployment: user.startOfEmployment,
            address: {
              line1: user.address?.line1,
              line2: user.address?.line2,
              line3: user.address?.line3,
              line4: user.address?.line4,
              postcode: user.address?.postcode,
              county: user.address?.county,
            },
            managerId: user.managerId,
            avatar: user.avatar,
            employeeAvatarId: user.avatar?.id,
            departmentId: user.department?.id,
            companyId: user.company?.id,
            passportNumber: user.passportNumber,
            nationalInsuranceNumber: user.nationalInsuranceNumber
          });
          this.loading = false;
        }
      })
    }
  }
  companyChange() {
    this.userForm.controls['companyId'].setValue(this.companies.find(x => x.key == this.companyId));

    this.getManagersForComany(this.companyId);
    this.getDepartmentsForCompany(this.companyId);
  }

  private getManagersForComany(companyId: string) {
    this.loading = true;
    this.employeeService.getManagersForCompanyId(companyId).subscribe((result: EmployeeListDto[]) => {
      this.managers = result;
      if (result.length === 1) {
        this.userForm.controls['managerId'].setValue(result[0].id);
      }
      this.loading = false;
    });
  }

  private getDepartmentsForCompany(companyId: string): void {
    this.loading = true;
    this.deptService.getDepartmentsByCompanyId(companyId).subscribe((depts: DepartmentDetailDto[]) => {
      this.departments = depts;
      this.loading = false;
    })
  }

  get userFormControl() {
    return this.userForm.controls;
  }
  get addressControls() {
    return ((this.userForm.get('address') as FormGroup).controls)
  }

  submit(form: FormGroup) {
    if (!form.valid) {
      this.check();
      return;
    }
    if (this.editing) {
      var employeeId = this.route.snapshot.paramMap.get('userid');
      var address = new EmployeeAddress({ ...form.value.address });
      var empDetails = new EmployeeDetailDto({ ...form.value });
      empDetails.address = address;

      this.employeeService.putEmployee(employeeId!, empDetails).subscribe({
        next: (result: EmployeeDetailDto) => {
          this._snackBar.open("Employee Updated Sucessfully", "OK", {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        error: x => {
          this._snackBar.open(`An Error Occured ${x}`, "OK", {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
          console.log(x)
        }
      })
    } else {
      // creating
      var address = new EmployeeAddress({ ...form.value.address });
      var ef2 = new EmployeeCreateDto({ ...form.value });

      ef2.address = address;

      this.employeeService.createEmployee(null, ef2).subscribe({
        next: (result: EmployeeDetailDto) => {
          if (result.id) {
            var formData = form.controls['avatar'].value;
            this.http.post(`https://localhost:7189/api/Employees/${result.id}/upload-avatar`, formData).subscribe({
              next: res => {
                console.log(res);
              }, error: err => console.log(err)
            })
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }


  }

  updateTitle(event: any) {
    console.log(event);
    this.userForm.controls['title'].setValue(event.value);
  }


  check() {
    const controls = this.userForm.controls;
    const invalidArr = [];
    const validArr = [];
    for (const name in controls) {
      if (controls[name].status === 'INVALID') {
        invalidArr.push(name);
      } else {
        validArr.push(name);
      }
    }
    console.log(`valid count : ${validArr.length}`)
    console.log(`invalid count : ${invalidArr.length}`)
  }


  /// This and the titleCaseWord funciton are just for me when deving as i'm lazy and just need some demo data...
  // TODO: Remove before this goes anywhere other than a dev env lol
  generateRandomUserData() {
    var url = "https://randomuser.me/api/?nat=gb";
    this.http.get<RandomUser>(url).subscribe(data => {
      this.userForm.patchValue({
        firstName: data.results[0].name.first,
        lastName: data.results[0].name.last,
        username: data.results[0].login.username + '@example.com',
        title: data.results[0].name.title,
        gender: this.titleCaseWord(data.results[0].gender),
        workEmailAddress: data.results[0].email,
        workPhoneNumber: data.results[0].phone,
        workMobileNumber: data.results[0].cell,
        dateOfBirth: new Date(data.results[0].dob.date),
        startOfEmployment: new Date(),
        holidayAllowance: (Math.random() * 40 | 7) + 1,
        nationalInsuranceNumber: data.results[0].id.value.replace(/\s/g, ""),
        address: {
          line1: data.results[0].location.street.number + " " + data.results[0].location.street.name,
          postcode: data.results[0].location.postcode,
          county: data.results[0].location.state,
        },
      });
    });
  }
  // TODO: Remove before this goes anywhere other than a dev env lol
  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
