import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../core/services/users.service';
import {Router} from '@angular/router';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isSubmitting: boolean;
  loginError: string | undefined;

  constructor(private usersService: UsersService,
              private router: Router) {
    this.changePasswordForm = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        newPasswordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
      }
    );
    this.isSubmitting = false;
  }

  ngOnInit(): void {
  }

  get email(): AbstractControl | null {
    return this.changePasswordForm.get('email');
  }

  get oldPassword(): AbstractControl | null {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword(): AbstractControl | null {
    return this.changePasswordForm.get('newPassword');
  }

  get newPasswordConfirmation(): AbstractControl | null {
    return this.changePasswordForm.get('newPasswordConfirmation');
  }


  changePassword(): void {
    if (this.newPassword?.value === this.newPasswordConfirmation?.value) {
      if (this.changePasswordForm.valid && !this.isSubmitting) {
        this.loginError = undefined;
        this.isSubmitting = true;
        const changePasswordRequest: any = {};
        changePasswordRequest.email = this.email?.value;
        changePasswordRequest.oldpassword = this.oldPassword?.value;
        changePasswordRequest.newPassword = this.newPassword?.value;
        this.usersService.changePassword(changePasswordRequest).subscribe(value => {
          this.isSubmitting = false;
          this.router.navigate(['/login']).then();
        }, () => {
          this.loginError = 'Email or password is not correct';
          this.isSubmitting = false;
        });
      }

    }
  }

}
