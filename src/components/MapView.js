import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline } from 'react-leaflet'
import L, { latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({routes, routesToShow}) {

  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
    iconUrl:
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0000ff&chf=a,s,ee00FFFF",
    iconSize: [21, 34],
    iconAnchor: [10, 34]
  }),

  greenIcon = new LeafIcon({
      iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00ff00&chf=a,s,ee00FFFF",
      iconSize: [21, 34],
      iconAnchor: [10, 34]
  }),

  redIcon = new LeafIcon({
      iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000&chf=a,s,ee00FFFF",
      iconSize: [21, 34],
      iconAnchor: [10, 34]
  });

  function ChangeView() {
    // let lat = 0, long = 0, i = 0.0;
    let lat = 28.644800, long = 77.216721, i = 0.0;

    let markerBounds = latLngBounds([]);

    routes.forEach(element => {
      if (routesToShow.indexOf(element.id) !== -1) {
        lat += ((parseFloat(element.latitude) + parseFloat(element.stops[element.stops.length-1].latitude))/2.0);
        long += ((parseFloat(element.longitude) + parseFloat(element.stops[element.stops.length-1].longitude))/2.0);
        i++;

        markerBounds.extend([parseFloat(element.latitude), parseFloat(element.longitude)])
        element.stops.forEach(stop => {
            markerBounds.extend([parseFloat(stop.latitude), parseFloat(stop.longitude)])
        })
      }
    });

    if (i > 0) {
        lat /= i;
        long /= i;
    }

    const map = useMap();
    map.setView({lng: long, lat: lat}, 10);
    
    markerBounds.isValid() && map.fitBounds(markerBounds)
    return null;
  } 

  return (
    <MapContainer 
    center={[77.21672, 28.644800]} 
    // center={[22.220022, 44.644800]} 
    zoom={10} scrollWheelZoom={true}>

      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ChangeView />
      {
        routes.map((item) => {
          if (routesToShow.indexOf(item.id) === -1) return null;

          let polyline = [];
          polyline.push([parseFloat(item.latitude), parseFloat(item.longitude)]);

          return(

            <div key={item.id}>
              {
                <Marker position={polyline[0]}
                    icon={blueIcon}>
                    <Popup>
                        {item.rout_name}
                    </Popup>
                </Marker>
              }
              {
                item.stops.map((stop) => {
                    polyline.push([parseFloat(stop.latitude), parseFloat(stop.longitude)])
                    
                    return(
                        <Marker position={polyline[polyline.length - 1]}
                            icon={(item.stops.indexOf(stop) !== item.stops.length - 1 ) ? redIcon : greenIcon}>
                            <Popup>
                                {stop.stopName}
                            </Popup>
                        </Marker>
                    )
                })
              }
              {
                <Polyline positions={polyline} />
              }
            </div>
          )        
        })
      }
    </MapContainer>
  )
}
