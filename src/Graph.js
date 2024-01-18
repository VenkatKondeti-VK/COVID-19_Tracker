import React,{useState, useEffect} from 'react'
import { Chart, registerables} from 'chart.js';
import {Line} from "react-chartjs-2"

Chart.register(...registerables);



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
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
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
      ) : (<h2>There are no new {casesType} cases.</h2>)} 
    </div>
  ) 
}

export default Graph
