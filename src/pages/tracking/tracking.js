import React, { useState, useEffect } from 'react';
import GoogleMapWrap from '../../components/GoogleMap/GoogleMapWrap';
const fetch = require("isomorphic-fetch");
// import map from './map.png';

// fetch(url).then(r => r.json().then(r => setMarkers(r.photos)));

// const data=getMarkers(url);

export default function Tracking() {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(null);

  const fetchMarkers = () => {
    const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/farrrr/dfda7dd7fccfec5474d3`,
      `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => (data?.photos.slice(0, 100))??[])
      .then(d => d.map(data=>Object.assign({}, data, {position: { lat: data.latitude, lng: data.longitude }})))
      .then(data => setMarkers(data||[]));
  }

  useEffect(() => fetchMarkers(), []);

  useEffect(() => {
    if (markers && markers[0]) {
      setCenter({ lat: markers[0].lat, lng: markers[0].lng });
    } else {
      setCenter({ lat: -23.533773, lng: -46.625290 });
    }
  }, [markers])

  return (<div className="Tracking">
    <h3>Tracking drone</h3>
    <GoogleMapWrap keyName="photo_id" markers={markers} defaultCenter={center} />
    {/* <img alt="Mapa mostrando onde estão os drones" src={map} style={{ 'width': '100%' }} /> */}
    {/* markers: {JSON.stringify(markers)} */}
  </div>
  );
}
