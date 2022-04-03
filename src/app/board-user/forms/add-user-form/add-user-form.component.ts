import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {
  form: FormGroup;
  imageSrc: string;

  constructor(private fb: FormBuilder) { }


  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.form.patchValue({
          avatar: file
        });
   
      };
   
    }
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      middleName:[null],
      lastName: [null, [Validators.required]],
      userName:[null, [Validators.required]],
      title:[null, [Validators.required]],
      gender:[null, [Validators.required]],
      workEmailAddress:[null, [Validators.required]],
      personalEmailAddress:[null, [Validators.required]],
      workPhoneNumber:[null, [Validators.required]],
      workMobileNumber:[null, [Validators.required]],
      phoneNumber:[null, [Validators.required]],
      personalMobileNumber:[null, [Validators.required]],
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
      department:[null, [Validators.required]],
    });


  }

}
