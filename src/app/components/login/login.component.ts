import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JwtService } from '../../services/jwt/jwt.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  showRegisterButton = true;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private auth: AuthService,
    private jwtService: JwtService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.loading = true;

      const { email, password } = this.loginForm.value;
      this.auth.login(email, password).subscribe(
        (res: any) => {
          const { token, userId, userName, isAdmin } = res;
          this.jwtService.token = token;

          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

          this._router.navigateByUrl('/main');
          this.loading = false;
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
          alert('Credenciais inválidas');
          this.loading = false;
        },
      );

    }
  }


  goToRegister() {
    this._router.navigate(['/register']);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
