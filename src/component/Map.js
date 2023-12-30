import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lon: 0,
            hide: true
        };
    }

    componentDidMount() {
        console.log("caimap" + this.props.map)
        this.updateLoadingState();
    }

    componentDidUpdate(prevProps) {

        if (this.props.map !== prevProps.map) {

            this.updateLoadingState();
        }
    }

    updateLoadingState = () => {
        const map = this.props.map;

        if (map) {
            this.setState({
                hide: true
            })

            if (typeof (map) === 'string') {
                const xy = map.split(',');
                const lat = xy[0].trim();
                const lon = xy[1].trim();

                console.log(lat);
                console.log(lon);
                console.log(typeof (lat));

                this.setState({
                    lat: parseFloat(lat),
                    lon: parseFloat(lon)
                });
            } else {
                console.log('cc');
            }
        } else {
            this.setState({
                hide: false
            });
        }
    };


    render() {
        console.log(this.state.lat)
        var defaultProps = {
            center: {
                lat: this.state.lat,
                lng: this.state.lon
            },
            zoom: 15
        };
        return (
            <>
                <div className={this.state.hide ? "" : "hide"} style={{ height: '12rem', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}>
               
                {/* AIzaSyAI9kPkskayYti5ttrZL_UfBlL3OkMEbvs */}
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyAI9kPkskayYti5ttrZL_UfBlL3OkMEbvs" }}
                        center={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                    </GoogleMapReact>

                </div>
            </>
        );
    }
}

export default Map;