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
      style: 'mapbox://styles/jennmez/ckbgveenp5hzy1joa87urkj4g',
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
        zoom: map.getZoom().toFixed(10),
      });
    });
    map.on('click', (e) => {
      let features = map.queryRenderedFeatures(e.point, {
        layers: ['chicago-parks'],
      });
      if (!features.length) {
        return;
      }
      let feature = features[0];
      let popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3>')
        .addTo(map);
    });
  }
  render() {
    return (
      <div className="App">
        <div className="sidebarStyle">Chicago Parks</div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
        {/* <div ref={(el) => (this.popup = el)} className="popup" /> */}
      </div>
    );
  }
}

export default App;
