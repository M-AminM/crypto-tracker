import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./coins.scss";

const Coins: React.FunctionComponent = () => {
  const [coinData, setCoinData] = useState<any>({});
  const { id } = useParams();
  const getCoin = async () => {
    const res = await axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => setCoinData(res.data));
  };

  useEffect(() => {
    getCoin();
  }, []);

  console.log(coinData);
  if (Object.keys(coinData).length === 0) {
    return <p className="loading">Loading ...</p>;
  }

  const regex = /(<([^>]+)>)/gi;
  const result = coinData.description?.en.split(". ")[0].replace(regex, "");
  return (
    <div className="coins">
      <img
        className="coins__icon"
        src={coinData.image?.large}
        alt={coinData.name}
      />
      <h1>{coinData.name}</h1>
      <p>{result}</p>
      <h3>
        Rank: <span>{coinData.coingecko_rank}</span>{" "}
      </h3>
      <h3>
        Current Price:{" "}
        <span>{coinData?.market_data?.current_price["usd"]}</span>{" "}
      </h3>
    </div>
  );
};

export default Coins;
