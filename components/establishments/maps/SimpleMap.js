import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { GOOGLE_API } from '../../../constants/api';

const SimpleMap = (props) => {
    
    const getMapOptions = (maps) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };
    
    const [center, setCenter] = useState({lat: 60.18004643833827, lng: 5.456975820218523 });
    const [zoom, setZoom] = useState(15);
    
    return (
        <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
          <Marker
            lat={60.18004643833827}
            lng={5.456975820218523}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;
