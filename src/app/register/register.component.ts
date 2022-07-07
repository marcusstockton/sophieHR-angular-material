import { Component } from '@angular/core';
import { AccountClient, RegisterUserDto } from '../client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: any = {
    firstName: null,
    lastName: null,
    email: null,
    password: null
  };
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AccountClient) { }

  onSubmit(): void {
    const { firstName, lastName, email, password } = this.form;

    var userReg: RegisterUserDto = new RegisterUserDto({
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      password: password
    });

    this.authService.registerNewAdminUser(userReg).subscribe(
      {
        next: (result) => {
          console.log(result);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        }, error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
  }

}
