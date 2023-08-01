import React,{useState, useEffect} from 'react'
import { Chart, registerables} from 'chart.js';
import {Line} from "react-chartjs-2"
import numeral from "numeral"

// https://disease.sh/v3/covid-19/historical/all?last=120

Chart.register(...registerables);

const options = {
  legend:{
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      }
    }
  },
  scales:{
    xAxes: [
      {
        type: "time",
        time:{
          format: "MM/DD/YY",
          tooltipFormat:"ll"
        }
      }
    ],
    yAxes:[
      {
        gridLines:{
          display: false
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          }
        }
      }
    ]
  }
}


const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  
  for(const date in data[casesType]) {
    if(lastDataPoint){
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
}

function Graph({casesType}) {

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?last=120")
      .then(response => {return response.json()})
      .then(data =>{
        let chartData = buildChartData(data, casesType);
        setData(chartData);
      });
    }

    fetchData();
  }, [casesType])

  return (
    <div>
      {data?.length > 0 ? (
        <Line 
          data={{
            datasets: [
              {
                label: "Worldwide new Cases",
                data:data
              }
            ]
          }}
        />
      ) : (<h2>There are no {casesType} cases </h2>)} 
    </div>
  ) 
}

export default Graph
