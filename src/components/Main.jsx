const Main = () => {
    return (
        <main>


            <div className="input-data-container">
                <div className="input-submit-container">
                    <input type="text" placeholder="Search for any IP address or domain"/>
                    <input type="submit" value=">"/>
                </div>
                <div className="data-container">
                    <div className="data-text">
                        <p>IP Address</p>
                        <p>192.212.174.101</p>
                    </div>
                    <div className="data-text"> 
                        <p>Location</p>
                        <p>Brooklyn, NY 10001</p>
                    </div>
                    <div className="data-text">
                        <p>Timezone</p>
                        <p>UTC - 05:00</p>
                    </div>
                    <div className="data-text">
                        <p>ISP</p>
                        <p>SpaceX Starlink</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main;