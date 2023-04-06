import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { myMunicipio } from './Map/fetchCep';


let defaultCenter = [-22.8397375, -43.2686432];
const defaultZoom = 18;
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});


function App() {
  const [state, setState] = useState(defaultCenter);
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState([])
  
  useEffect(() => {
    const city = () => {
      setCidade(myMunicipio)
    };
    city()
  }, [])

  function FlyMapTo() {
    const map = useMap()
    useEffect(() => {
      map.flyTo(state, map.getZoom())
    }, [map])

    return null
  }

  const handleOnSetView = () => {
    const result = cidade.filter((item) => item.MUNICIPIO === cep.toUpperCase())
    console.log(result);
    if (result.length === 0) {
      alert('Municipio not found')
    } else {
      setState([result[0].LATITUDE, result[0].LONGITUDE])
    }
  }

  return (
    <div className="App">
      {state.length > 0 ? <MapContainer
        center={state}
        zoom={defaultZoom}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        <Marker position={state} icon={DefaultIcon}>
        </Marker>
        <FlyMapTo />
      </MapContainer> : null}
      <div className="sidebar">
        <h2>Location</h2>
        <p>
          Municipio Brasileiro
        </p>
        <p>
          <input type="text" onChange={(e) => setCep(e.target.value)}/>
          <button type='button' onClick={handleOnSetView}>
            Set location
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;