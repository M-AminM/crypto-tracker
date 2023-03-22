import { BehaviorSubject, map, combineLatestWith } from "rxjs";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  power?: string;
  selected?: boolean;
}

export const rawPokemon$ = new BehaviorSubject<Pokemon[]>([]);

export const pokemonWithPower$ = rawPokemon$.pipe(
  map((pokemon) =>
    pokemon.map((p) => ({
      ...p,
      power: p.id + p.name,
    }))
  )
);

export const selected$ = new BehaviorSubject<number[]>([]);

export const pokemon$ = pokemonWithPower$.pipe(
  combineLatestWith(selected$),
  map(([pokemon, selected]) =>
    pokemon.map((p) => ({
      ...p,
      selected: selected.includes(p.id),
    }))
  )
);

export const deck$ = pokemon$.pipe(
  map((pokemon) => pokemon.filter((p) => p.selected))
);

fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
  .then((res) => res.json())
  .then((data) => rawPokemon$.next(data));
