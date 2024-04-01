import { Injectable } from "@angular/core";
import { BLPToken } from "../models/blp-token";
import { CALCULATE_TOKENS_SUPPLY_API, LOAD_ALL_BLP_TOKENS_API } from "../constants/backEnd-api";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokens: BLPToken[];

  constructor(private http: HttpClient) {}

  public getTokens(): Observable<BLPToken[]> {
    // Working like a cache
    if (Array.isArray(this.tokens) && this.tokens.length) {
      return of(this.tokens);
    }

    return this.loadBplTokens();
  }

  public loadBplTokens(): Observable<BLPToken[]> {
    return this.http.get<BLPToken[]>(LOAD_ALL_BLP_TOKENS_API).pipe(
      map((_tokens) => {
        this.tokens = _tokens;

        return _tokens;
      })
    );
  }

  public LoadTokensSupply() {
     return this.http.post<BLPToken[]>(CALCULATE_TOKENS_SUPPLY_API, null).pipe(
       map((_tokens) => {
         this.tokens = _tokens;

         return _tokens;
       })
     );
  }
}
