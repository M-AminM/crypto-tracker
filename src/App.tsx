import React, { useEffect, useState, useMemo } from "react";
import {
  Pokemon,
  selected$,
  pokemon$,
  deck$,
  pokemonWithPower$,
} from "./store";
import { useObservableState } from "observable-hooks";
import "./style.scss";

const Deck = () => {
  const deck = useObservableState(deck$, []);
  return (
    <div>
      <h4>Deck</h4>
      <div>
        {deck.map((p) => (
          <div key={p.id} style={{ display: "flex" }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
            />
            <h5>{p.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

const Search = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const sub = pokemon$.subscribe((x) => setPokemon(x));
    return () => sub.unsubscribe();
  }, []);

  const filterPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);

  return (
    <div style={{ padding: "1rem" }}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {filterPokemon.map((p) => (
          <div style={{ display: "flex", alignItems: "center" }} key={p.id}>
            <input
              type="checkbox"
              checked={p.selected}
              onChange={() => {
                if (selected$.value.includes(p.id)) {
                  selected$.next(selected$.value.filter((id) => id !== p.id));
                } else {
                  selected$.next([...selected$.value, p.id]);
                }
              }}
            />
            <h4>{p.name}</h4> - {p.power}
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FunctionComponent = () => {
  // pokemon$.subscribe((x) => console.log(x));
  // pokemonWithPower$.subscribe((x) => console.log(x));
  return (
    <div className="App" style={{ display: "flex" }}>
      <Search />
      <Deck />
      <div className="karim">Heloo</div>
    </div>
  );
};

export default App;
