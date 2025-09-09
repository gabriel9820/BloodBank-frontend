import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { formMessages } from 'src/app/shared/utils/messages';
import { LoginService } from './services/login.service';
import { LoginRequest } from './models/login-request.model';
import { isInvalid } from 'src/app/shared/utils/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formMessages = formMessages;
  showPassword = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = this.loginForm.value;
    this.loginService.login(payload).subscribe(
      (response) => {
        console.log('Login realizado com sucesso!', response);
        // setar user no localStorage
      },
      (error) => {
        console.error('Erro ao realizar login!', error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isInvalid(field: string, validator: string): boolean {
    return isInvalid(this.loginForm, field, validator);
  }
}
