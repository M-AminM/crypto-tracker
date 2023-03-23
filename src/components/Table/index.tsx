import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Crypto, filterCrypto$, rawCrypto$ } from "../../store";
import { CoinList } from "../Config/api";
import AgGrid from "./agGrid";

const Table: React.FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState<Crypto[]>([]);

  useEffect(() => {
    const sub = filterCrypto$.subscribe((x) => setCrypto(x));
    return () => sub.unsubscribe();
  }, []);

  const filterCrypto = useMemo(() => {
    return crypto.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [crypto, search]);

  // console.log(filterCrypto);

  return (
    <div style={{ padding: "1rem" }}>
      <AgGrid />
    </div>
  );
};

export default Table;
