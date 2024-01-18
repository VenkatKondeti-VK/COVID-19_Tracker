import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle } from 'react-leaflet'
import './Map.css'

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 100
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 300
  },
  deaths: {
    hex: "#d79f1d",
    multiplier: 500
  }
}

function ChangeView({center, zoom}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({countries,casesType,center,zoom}) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker 
          position={center}
        >
        </Marker>

        {countries.map(country => {

          return (
            <Circle
              key={country.country}
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillOpacity={0.4}
              pathOptions={{
                color:casesTypeColors[casesType].hex,
                fillColor:casesTypeColors[casesType].hex
              }}
              radius={(Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier)}
            >
              <Popup>
                <div className="info-container">
                  <div
                    className="info-flag"
                    style={{backgroundImage: `url(${country.countryInfo.flag})`}}
                  >
                  </div>
                  <h2>{country.country}</h2>
                  <p>cases: {country.cases}</p>
                  <p>recovered: {country.recovered}</p>
                  <p>deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Circle>
          )
        })}

      </MapContainer>
    </div>
  )
}

export default Map
