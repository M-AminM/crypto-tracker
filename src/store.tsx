import { BehaviorSubject, map, combineLatestWith } from "rxjs";
import axios from "axios";
import { CoinList } from "./components/Config/api";

export interface Crypto {
  id: number;
  name: string;
  image: string;
  ath_change_percentag: number;
  current_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export const rawCrypto$ = new BehaviorSubject<Crypto[]>([]);

export const filterCrypto$ = rawCrypto$.pipe(
  map((pokemon) => pokemon.filter((p) => p.name))
);

axios.get(CoinList()).then((res) => rawCrypto$.next(res.data));

export const signleCoin$ = new BehaviorSubject<Crypto[]>([]);
