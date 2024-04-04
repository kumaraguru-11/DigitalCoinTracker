import React, { useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoins } from "../Slice/CoinsSlice";
import data from "../CurrencyCode.json";
import { useParams } from "react-router-dom";
import Chart from "./Graphs/chart";
import { fetchMarketStats } from "../Slice/StatsSlice";
import Loader from "../Component/feature/Loader";

const Market = () => {
  const coins = useSelector((state) => state.coins.coins.data);
  const stats = useSelector((state) => state.stats.stats);
  const dispatch = useDispatch();
  const params = useParams();

  const [value, setValue] = useState({
    time: "DIGITAL_CURRENCY_DAILY",
    coin: "",
    market: "INR",
    period: "Daily",
  });

  const symbol =
    coins && coins.coins.find((c) => c.uuid === params.uuid).symbol;
  //fetch coins
  React.useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  //fetch market stats
  React.useEffect(() => {
    if (value.market && value.time) {
      const options = {
        params: {
          function: value.time,
          market: value.market,
          symbol: value.coin ? value.coin : symbol,
        },
        headers: {
          "X-RapidAPI-Key":
            "ffc6c94612msh07710f41c73452dp1126fdjsn1b944e487f04",
          "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
        },
      };

      dispatch(fetchMarketStats(options));
    }
  }, [dispatch, value, symbol]);

  //! Coin Input
  //mapping the value in Input field
  const COINS =
    coins &&
    coins.coins.map((c) => ({
      value: c.symbol,
      label: c.symbol,
    }));

  //Get and assign value in useState
  const handleSelectCoin = (selectedOption) => {
    setValue({ ...value, coin: selectedOption.value });
  };

  //set default value in input field
  const defaultValue = { value: symbol, label: symbol };

  //! Time Series Input
  //mapping the value in Input field
  const TimeSeries = [
    { value: "DIGITAL_CURRENCY_DAILY", label: "Daily" },
    { value: "DIGITAL_CURRENCY_WEEKLY", label: "Weekly" },
    { value: "DIGITAL_CURRENCY_MONTHLY", label: "Monthly" },
  ];

  //Get and assign value in useState
  const handleSelectTime = (selectedOption) => {
    setValue({
      ...value,
      time: selectedOption.value,
      period: selectedOption.label,
    });
  };

  //! Market Input
  //mapping the value in Input field
  const Curr_Code = Object.entries(data).map(([code, name]) => ({
    value: code,
    label: code,
  }));

  //Get and assign value in useState
  const handleSelectCode = (selectedOption) => {
    setValue({ ...value, market: selectedOption.value });
  };

  //set default value in input field
  const Market_default = { value: "INR", label: "INR" };
  return (
    <div>
      <div className="d-flex flex-sm-row flex-column justify-content-between gap-3 p-3">
        <div className="d-flex flex-column flex-grow-1 flex-wrap">
          <label>Time Series:</label>
          <Select
            options={TimeSeries}
            placeholder="Search..."
            onChange={handleSelectTime}
            defaultValue={TimeSeries[0]}
          />{" "}
        </div>
        <div className="d-flex flex-column flex-grow-1 flex-wrap">
          <label>Coin:</label>
          <Select
            options={COINS}
            placeholder="Search..."
            onChange={handleSelectCoin}
            defaultValue={defaultValue}
          />{" "}
        </div>
        <div className="d-flex flex-column flex-grow-1 flex-wrap">
          <label>Market:</label>
          <Select
            options={Curr_Code}
            placeholder="Search..."
            onChange={handleSelectCode}
            defaultValue={Market_default}
          />{" "}
        </div>
      </div>

      {Object.keys(stats).length !== 0 && stats["Meta Data"] ? (
        <Chart stats={stats} />
      ) : stats["Error Message"] ? (
        <div>Data Not Found</div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Market;
