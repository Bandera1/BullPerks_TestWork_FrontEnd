import { Component, Input } from '@angular/core';
import { TokenService } from '../services/token-service';
import { BLPToken } from '../models/blp-token';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-token-view',
  templateUrl: './token-view.component.html',
  styleUrl: './token-view.component.scss',
})
export class TokenViewComponent {
  displayedColumns: string[] = ['name', 'totalSupply', 'circulatingSupply'];
  dataSource: BLPToken[];
  aSab: Subscription = new Subscription();

  constructor(private tokenService: TokenService, private authService: AuthService) {

  }

  ngOnInit() {
    this.reloadTokens();
  }

  clearTable() {
    if (!this.dataSource.length) {
      alert('Table already empty');
      return;
    }

    this.dataSource = [];
  }

  reloadTokens() {
    this.aSab = this.tokenService.getTokens().subscribe((tokens: any) => {
      this.dataSource = tokens;
    });
  }

  loadSupply() {
    if(!this.authService.isAuthenticated()) {
      alert('You have to be authenticated to load supply');
      return;
    }

    this.aSab = this.tokenService
      .LoadTokensSupply()
      .subscribe((tokens: any) => {
        this.dataSource = tokens;
      });
  }

  ngOnDestroy() {
    if (this.aSab) {
      this.aSab.unsubscribe();
    }
  }
}
