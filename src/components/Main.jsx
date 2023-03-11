const api_key = import.meta.env.VITE_GEO_API_KEY;
import { useState, useEffect } from "react";

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

            <div id="map"><p>test</p></div>
        </main>
    )
}

export default Main;