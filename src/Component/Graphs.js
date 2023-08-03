import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graphs = () => {
  const uuid = useSelector((state) => state.uuid);
  const [exchange, setExchange] = React.useState();
  React.useEffect(() => {
    fetch(
      `https://coinranking1.p.rapidapi.com/coin/${uuid.uuid}/history?timePeriod=24h`,
      {
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((res) => {
        setExchange(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uuid]);
  const ExchangePrice =
    exchange &&
    exchange.history.map((el) => {
      return el.price;
    });
  const ExchangeTimeStamp =
    exchange &&
    exchange.history.map((el) => {
      return el.timestamp;
    });
  const data = {
    labels: ExchangeTimeStamp,
    datasets: [
      {
        label: "Price in USD (24hrs Data)",
        data: ExchangePrice,
        borderColor: "rgb(0, 113, 189)",
        backgroundColor: "rgb(0, 113, 189)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default Graphs;
