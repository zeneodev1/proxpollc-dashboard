import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../core/services/users.service';
import {Router} from '@angular/router';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting: boolean;
  loginError: string | undefined;

  constructor(private usersService: UsersService,
              private router: Router) {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      }
    );
    this.isSubmitting = false;
  }

  ngOnInit(): void {
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.valid && !this.isSubmitting) {
    this.loginError = undefined;
    this.isSubmitting = true;
    const user = new User();
    user.email = this.email?.value;
    user.password = this.password?.value;
    this.usersService.login(user).subscribe(value => {
      localStorage.setItem('token', value);
      this.isSubmitting = false;
      this.router.navigate(['/products']).then();
    }, () => {
      this.loginError = 'Email or password is not correct';
      this.isSubmitting = false;
    });
    }
  }

}
