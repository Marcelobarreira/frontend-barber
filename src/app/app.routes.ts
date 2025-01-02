import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BemvindoComponent } from './components/bemvindo/bemvindo.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { AgendarSemLoginComponent } from './components/agendar-sem-login/agendar-sem-login.component';
import { DatasDisponiveisComponent } from './components/datas-disponiveis/datas-disponiveis.component';
import { ConfirmacaoComponent } from './components/confirmacao/confirmacao.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'datas-disponiveis', component: DatasDisponiveisComponent },
  {
    path: 'agendar-sl',
    component: AgendarSemLoginComponent,
  },
  {
    path: 'confirmacao',
    component: ConfirmacaoComponent,
  },
  {
    path: 'bem-vindo',
    component: BemvindoComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'bem-vindo',
    pathMatch: 'full',
  },
];
