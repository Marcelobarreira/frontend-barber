import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegisterComponent {
  showPopup: boolean = true;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;


  registerForm: FormGroup;
  errors = {
    username: false,
    email: false,
    password: false,
  };

  constructor(private authService: AuthService, private _router: Router, private fb: FormBuilder,) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.openPopup();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }



  onRegister(): void {
    // Verifica se o formulário é válido
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

      this.authService.register(email, password, username).subscribe({
        next: (response) => {
          alert('Registro bem-sucedido!');
          this._router.navigate(['/login']); // Redireciona para o login
        },
        error: (error) => {
          alert('Erro ao registrar. Tente novamente.');
          console.error('Erro ao registrar:', error);
        },
      });
    } else {
      // Marca todos os campos como "tocados" para exibir as mensagens de erro
      this.registerForm.markAllAsTouched();

      // Verifica se o erro é devido às senhas não coincidirem
      if (this.registerForm.hasError('passwordsMismatch')) {
        alert('As senhas não coincidem.');
      }
    }
  }


  goToLogin(): void {
    this._router.navigate(['/login']);
  }

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
