const api_key = import.meta.env.VITE_GEO_API_KEY;
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const newicon = new L.icon({
    iconUrl: "../src/assets/icon-location.svg",
    iconSize: [30, 30]
  });

const Main = () => {
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${inputValue}`)
            .then((response) => response.json())
            .then((data) => {setData(data); console.log(data)})
            .catch((error) => console.log(error));
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${inputValue}&domain=${inputValue}`)
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    return (
        <main>
            <div className="input-data-container">
                <form className="input-submit-container" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search for any IP address or domain" aria-label="Search for any IP address or domain" value={inputValue} onChange={handleInputChange}/>
                    <input type="submit" value="Send request"/>
                </form>
                <div className="data-container">
                    <div className="data-text">
                        <p>IP Address</p>
                        {data?.ip}
                    </div>
                    <div className="data-text"> 
                        <p>Location</p>
                        {`${data?.location?.city}, ${data?.location?.region} ${data?.location?.postalCode}`}
                    </div>
                    <div className="data-text">
                        <p>Timezone</p>
                        {data?.location?.timezone}
                    </div>
                    <div className="data-text">
                        <p>ISP</p>
                        {data?.isp}
                    </div>
                </div>
            </div>

            {/* <div id="map"> */}
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]} icon={newicon}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            {/* </div> */}
        </main>
    )
}

export default Main;