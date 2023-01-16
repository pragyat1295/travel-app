import React, {useState} from 'react';
import '../styles/home.css';

import MapView from '../components/MapView';
import Header from '../components/Header';
import RouteListView from '../components/RouteListView';
import ScrollTop from '../components/ScrollTop';

export default function Home({routes, modifyRoute}) {

  const [routesToShow, setRoutesToShow] = useState([]);

  const handleMapViewToggle = (routeID) => {
    const index = routesToShow.indexOf(routeID);
    if (index > -1) setRoutesToShow(routesToShow => routesToShow.filter(item => item !== routeID))
    else setRoutesToShow(routesToShow => [...routesToShow, routeID]);
  }
   
  return (
    <div>
      
      <div className = 'row home_layout_container nopadding'>

      {/* List View */}

      <div className = 'col-lg-4  filter_layout'>

        <RouteListView routes={routes}
          modifyRoute={modifyRoute} 
          handleMapViewToggle={handleMapViewToggle} />
          <ScrollTop/>
      </div>

      {/* Map View */}

      <div className = 'col-lg-8 nopadding'>
          <MapView routes={routes} routesToShow={routesToShow} />
        

      </div>

      </div>
    </div>
    
  )
}
