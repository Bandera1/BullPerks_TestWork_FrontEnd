import { Component, Input } from '@angular/core';
import { TokenService } from '../services/token-service';
import { BLPToken } from '../models/blp-token';
import { Subscription } from 'rxjs';


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

  displayProgressSpinner: boolean;

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.displayProgressSpinner = true;
    this.aSab = this.tokenService.getTokens().subscribe((tokens: any) => {
      this.dataSource = tokens;
      this.displayProgressSpinner = false;
    });
  }

  ngOnDestroy() {
    if (this.aSab) {
      this.aSab.unsubscribe();
    }
  }
}
