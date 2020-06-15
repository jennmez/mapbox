import React from 'react';
import './styles/index.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiamVubm1leiIsImEiOiJjazV3cGsxODYxeGtpM2ttcWZubDlzZG84In0.dId_CPazp07jO7R39YxC0w';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -87.623177,
      lat: 41.881832,
      zoom: 10,
    };
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.on('move', () => {
      this.setState({
        // getCenter(): a Mapbox GL JS method, to get the new longitude and latitude of the point at the center of the map.
        // toFixed(), a JavaScript method, to truncate the resulting floating point number to the specified number of digits
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        // getZoom(), a Mapbox GL JS method, to determine the zoom level that the map is set to.
        zoom: map.getZoom.getZoom().toFixed(10),
      });
    });
  }
  render() {
    return (
      <div className="App">
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default App;
