import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BemvindoComponent } from './components/bemvindo/bemvindo.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'bem-vindo',
    component: BemvindoComponent
  },

  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];
