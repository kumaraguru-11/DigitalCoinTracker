import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ stats }) => {
  const info = stats["Meta Data"]["1. Information"];
  const period = info.slice(0, info.indexOf(" "));
  const market = stats["Meta Data"]["4. Market Code"];

  //destructure stats props
  const {
    "Meta Data": metaData,
    [`Time Series (Digital Currency ${period})`]: timeSeries,
  } = stats && stats;

  //exact and create new array of object from stats
  function ExtractedData() {
    let Data = [];
    let count = 0;
    for (const [key, val] of Object.entries(timeSeries)) {
      const data = [
        parseInt(val[`1a. open (${market})`]),
        parseInt(val[`2a. high (${market})`]),
        parseInt(val[`3a. low (${market})`]),
        parseInt(val[`4a. close (${market})`]),
      ];

      Data.push({
        date: key,
        data: data,
      });
      count++;
      if (count >= 5) {
        break;
      }
    }
    return Data;
  }

  const extractedData = stats["Meta Data"] ? ExtractedData() : "No Data Found";

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels: extractedData.map((el) => {
      return el.date;
    }),
    datasets: [
      {
        label: "Open price",
        data: extractedData.map((el) => el.data[0]),
        backgroundColor: "#8E7AB5",
      },
      {
        label: "High Price",
        data: extractedData.map((el) => el.data[1]),
        backgroundColor: "#B784B7",
      },
      {
        label: "Low Price",
        data: extractedData.map((el) => el.data[2]),
        backgroundColor: "#E493B3",
      },
      {
        label: "Close Price",
        data: extractedData.map((el) => el.data[3]),
        backgroundColor: "#EEA5A6",
      },
    ],
  };

  return (
    <div className=" my-4 p-3">
      <h2 className="d-flex justify-content-center">
        {metaData["1. Information"]}
      </h2>

      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
