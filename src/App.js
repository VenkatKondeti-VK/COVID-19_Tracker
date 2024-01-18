import React, {useState, useEffect} from "react"
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  // Typography
} from "@mui/material"
import './App.css'
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from "./Table"
import './Table.css'
import {sortData} from "./util"
import Graph from "./Graph"
import { prettyPrintStat } from "./util"


// https://disease.sh/v3/covid-19/countries
import React, {useState, useEffect} from "react"
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  // Typography
} from "@mui/material"
import './App.css'
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from "./Table"
import './Table.css'
import {sortData} from "./util"
import Graph from "./Graph"
import { prettyPrintStat } from "./util"



function App() {
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState({});
  const [country, setCountry] = useState("worldwide");
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng:-40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [typeCases, setTypeCases] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => {return response.json()})
    .then(data => {
      setCountryData(data);
    })
  }, [])

  useEffect(() =>{

    const getCountriesData = async () => {
       await fetch("https://disease.sh/v3/covid-19/countries")
       .then(response => { return response.json() })
       .then(data => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2
            }
          });
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
       })
    }
    getCountriesData();

  }, []);

  async function onCountryChange(event){
    const newCountry = event.target.value;
    //console.log(newCountry);

    const url = (newCountry === "worldwide") ? "https://disease.sh/v3/covid-19/all?strict=true" : `https://disease.sh/v3/covid-19/countries/${newCountry}?strict=true`
    //console.log(url);

    await fetch(url)
    .then((response => {return response.json()}))
    .then(data => {
      setCountry(newCountry);
      setCountryData(data);
      
      if(newCountry === "worldwide"){
        setMapCenter([34.80746,-40.4796]);
      }
      else{
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      }
      setMapZoom(4);
    })

  }


  return (
    <div className="app">

      <div className="app_left">
        {/* Header */}
        <div className="app_header">
          {/* Title */}
          <h1>COVID-19 Tracker</h1>

          {/* Select input dropdown */}
          <FormControl className="app_dropdown">
            <Select value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => {
                return <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        

        {/* InfoBoxes */}
        <div className="app_stats">
          <InfoBox active={typeCases === "cases"} isRed={typeCases === "cases"} onClick={e => {setTypeCases("cases")}} name="cases" title="Corona Cases" cases={prettyPrintStat(countryData.todayCases)} total={prettyPrintStat(countryData.cases)}/>
          <InfoBox active={typeCases === "recovered"} onClick={e => {setTypeCases("recovered")}} name="recovered" title="Recovered Cases" cases={prettyPrintStat(countryData.todayRecovered)} total={prettyPrintStat(countryData.recovered)} />
          <InfoBox active={typeCases === "deaths"} isRed={typeCases === "deaths"} onClick={e => {setTypeCases("deaths")}} name="deaths" title="Deaths" cases={prettyPrintStat(countryData.todayDeaths)} total={prettyPrintStat(countryData.deaths)} />
        </div>

        {/* Map */}
        <Map countries={mapCountries} casesType={typeCases} center={mapCenter} zoom={mapZoom}/>

      </div>


      <Card className="app_right">
        <CardContent>

          {/* Table */}  
          <h3>Live Cases by Country</h3>  
          <Table countries={tableData} />

          {/* Graph */}
          <h3 style={{marginTop: "20px"}}>Worldwide new Cases</h3>
          <Graph casesType={typeCases}/>

        </CardContent>
      </Card>

    </div>
  );
}

export default App;

// https://disease.sh/v3/covid-19/{country}

function App() {
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState({});
  const [country, setCountry] = useState("worldwide");
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng:-40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [typeCases, setTypeCases] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => {return response.json()})
    .then(data => {
      setCountryData(data);
    })
  }, [])

  useEffect(() =>{

    const getCountriesData = async () => {
       await fetch("https://disease.sh/v3/covid-19/countries")
       .then(response => { return response.json() })
       .then(data => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2
            }
          });
          
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
       })
    }
    getCountriesData();

  }, []);

  async function onCountryChange(event){
    const newCountry = event.target.value;
    console.log(newCountry);

    const url = (newCountry === "worldwide") ? "https://disease.sh/v3/covid-19/all?strict=true" : `https://disease.sh/v3/covid-19/countries/${newCountry}?strict=true`
    console.log(url);

    await fetch(url)
    .then((response => {return response.json()}))
    .then(data => {
      setCountry(newCountry);
      setCountryData(data);
      
      if(newCountry === "worldwide"){
        setMapCenter([34.80746,-40.4796]);
      }
      else{
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      }
      setMapZoom(3);
    })

  }


  return (
    <div className="app">

      <div className="app_left">
        {/* Header */}
        <div className="app_header">
          <h1>COVID-19 Tracker</h1>

          {/* Title + Select input dropdown */}
          <FormControl className="app_dropdown">
            <Select value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => {
                return <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        

        {/* InfoBoxes */}
        <div className="app_stats">
          <InfoBox active={typeCases == "cases"} isRed={typeCases == "cases"} onClick={e => {setTypeCases("cases")}} name="cases" title="Corona Cases" cases={prettyPrintStat(countryData.todayCases)} total={prettyPrintStat(countryData.cases)}/>
          <InfoBox active={typeCases == "recovered"} onClick={e => {setTypeCases("recovered")}} name="recovered" title="Recovered Cases" cases={prettyPrintStat(countryData.todayRecovered)} total={prettyPrintStat(countryData.recovered)} />
          <InfoBox active={typeCases == "deaths"} isRed={typeCases == "deaths"} onClick={e => {setTypeCases("deaths")}} name="deaths" title="Deaths" cases={prettyPrintStat(countryData.todayDeaths)} total={prettyPrintStat(countryData.deaths)} />
        </div>

        {/* Map */}
        <Map countries={mapCountries} casesType={typeCases} center={mapCenter} zoom={mapZoom}/>

      </div>

      <Card className="app_right">
        <CardContent>

          <h3>Live Cases by Country</h3>
          {/* Table */}    
          <Table countries={tableData} />

          <h3 style={{marginTop: "20px"}}>Worldwide new Cases</h3>
          {/* Graph */}
          <Graph casesType={typeCases}/>

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
