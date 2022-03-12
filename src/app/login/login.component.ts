import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  
  isLoggedIn = false;
  loggingIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = '';
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.redirectUser(this.role);
    }
  }
  onSubmit(form: any): void {
    this.loggingIn = true;
    const { username, password } = form.value;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.loggingIn = false;
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        this.tokenStorage.isLoggedIn.next(true);
        this.redirectUser(this.role);
      },
      error: err => {
        this.loggingIn = false;
        if(err instanceof HttpErrorResponse){
          switch(err.status){
            case HttpStatusCode.BadRequest:
              this.errorMessage = err.error;
              break;

            default:
              this.errorMessage = err.error.message;
          }
        }else{
          this.errorMessage = err.error.message;
        }
        this.isLoginFailed = true;
      }
    });
  }

  redirectUser( role: string){
    if(this.role === 'Admin'){
      console.log("Logged in as Admin");
      this.router.navigate(['/admin'])
    }
    if(this.role === 'Manager'){
      console.log("Logged in as Manager");
      this.router.navigate(['/manager'])
    }
    if(this.role==='User'){
      console.log("Logged in as User");
      this.router.navigate(['/user'])
    }
  }
}
