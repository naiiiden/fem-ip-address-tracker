const Main = () => {
    return (
        <main>


            <div className="input-data-container"
                style={{
                    "position": "absolute",
                    "left": 0,
                    "right": 0,
                    "margin": "0 2rem",
                    "top": "6.5rem",
                    "display": "flex",
                    "flexDirection": "column",
                    "gap": "2rem",
                }}
            >
                <div className="input-submit-container">
                    <input type="text" />
                    <input type="submit" value=">"/>
                </div>
                <div style={{"textAlign": "center"}}>
                    <div style={{"background": "green", "padding": ".5rem"}}>
                        <div>IP ADDRESS</div>
                        <div>192.212.174.101</div>
                    </div>
                    <div style={{"background": "red", "padding": ".5rem"}}> 
                        <div>LOCATION</div>
                        <div>Brookyln, NY 10001</div>
                    </div>
                    <div style={{"background": "hotpink", "padding": ".5rem"}}>
                        <div>TIMEZONE</div>
                        <div>UTC - 05:00</div>
                    </div>
                    <div style={{"background": "yellow", "padding": ".5rem"}}>
                        <div>ISP</div>
                        <div>SpaceX Starlink</div>
                    </div>
                </div>
            </div>


            <h1>test</h1>
        </main>
    )
}

export default Main;