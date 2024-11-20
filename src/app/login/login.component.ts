import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountClient, UserLogins } from '../client';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  retrievingManagers: boolean = false;

  form: UntypedFormGroup;

  isLoggedIn = false;
  loggingIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string | undefined = '';
  hidePassword: boolean = true;
  userId: string;

  managers: string[];
  admins: string[];

  constructor(
    private authService: AccountClient,
    private tokenStorage: TokenStorageService,
    private fb: UntypedFormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['admin@hr.com', [Validators.required]],
      password: ['P@55w0rd1', [Validators.required]],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.redirectUser(this.tokenStorage.getUser()?.role || '');
    }
    this.getManagers();
  }


  onSubmit(form: UntypedFormGroup): void {
    if (!form.valid) {
      return;
    }
    this.loggingIn = true;
    const { username, password } = form.value;

    var userlogin: UserLogins = new UserLogins({
      userName: username,
      password: password
    });

    this.authService.getToken(userlogin).subscribe({
      next: (data) => {
        this.loggingIn = false;
        this.tokenStorage.saveToken(data.token!);
        this.tokenStorage.saveUser(data);
        this.userId = data.id!;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.tokenStorage.isLoggedIn = true;
        this.redirectUser(this.tokenStorage.getUser()?.role || '');
      },
      error: (err) => {
        // console.log("Error!", err);
        this.loggingIn = false;
        this.isLoginFailed = true;
      }
    })
  }

  getManagers() {
    this.retrievingManagers = true;

    this.authService.getListOfCompanyAdmins().subscribe({
      next: x => {
        this.admins = x;
      }
    })
    this.authService.getListOfManagers().subscribe((managers) => {
      this.managers = managers;
      this.retrievingManagers = false;
    }, (err) => {
      this.retrievingManagers = false;
      // console.log("Unable to get Managers...")
    })
  }

  redirectUser(role: string) {
    if (role === 'Admin') {
      // console.log("Logged in as Admin");
      this.router.navigate(['/admin'])
    }
    if (role === 'Manager' || role === "CompanyAdmin") {
      // console.log("Logged in as Manager");
      this.router.navigate(['/manager'])
    }
    if (role === 'User') {
      // console.log("Logged in as User");
      this.router.navigate(['/user', { userid: this.userId }])
    }
  }

}
