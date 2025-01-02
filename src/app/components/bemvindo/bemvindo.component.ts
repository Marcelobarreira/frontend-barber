import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bemvindo',
  standalone: true,
  imports: [],
  templateUrl: './bemvindo.component.html',
  styleUrl: './bemvindo.component.scss'
})
export class BemvindoComponent {
  constructor(private _router: Router) {}

  goToRegister() {
    this._router.navigate(['/agendar-sl']);
  }

}
