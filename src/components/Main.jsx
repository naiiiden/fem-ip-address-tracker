const api_key = import.meta.env.VITE_GEO_API_KEY;
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const newicon = new L.icon({
    iconUrl: "../src/assets/icon-location.svg",
    iconSize: [25, 30]
  });

const Main = () => {
    const [data, setData] = useState([]);
    const [location, setLocation] = useState({ lat: null, lng: null })
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${inputValue}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data); 
                console.log(data); 
                setLocation({ lat: data?.location?.lat, lng: data?.location?.lng })
            })
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
            if (data?.location?.lat !== undefined && data?.location?.lng !== undefined) {
                setLocation({ lat: data?.location?.lat, lng: data?.location?.lng })
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };

    function FlyMapTo({ center }) {
        const map = useMap();
      
        useEffect(() => {
          map.flyTo(center);
        });
      
        return null;
    }

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

            {(location?.lat !== null && location?.lng !== null) && 
                <MapContainer center={[location?.lat, location?.lng]} zoom={16} scrollWheelZoom={false} zoomControl={false}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ZoomControl position="bottomright"/>
                    <Marker position={[location?.lat, location?.lng]} icon={newicon}/>
                    <FlyMapTo center={[location?.lat, location?.lng]} zoom={16}/>
                </MapContainer>
            }
        </main>
    )
}

export default Main;