import { BrowserRouter as Router,
  Routes, 
  Route,
  // redirect,
  // useNavigate ,
  Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import RouteForm from './pages/RouteForm';
import Header from './components/Header';

const API = 'routes.json';

function App() {

  const [routes, setRoutes] = useState([]);

  async function loadData() {
    let data = localStorage.getItem("routes");

    if (data === null) {
      const request = fetch(API);
      const response = await request;
      data = await response.json();

      localStorage.setItem("routes", JSON.stringify(data));
    }
    
    setRoutes(JSON.parse(data));
  }

  const addRoute = (route) => {
    const temp_obj = {
      id: routes.length+1,
      ...route
    }
    setRoutes(routes => [...routes, temp_obj]);
    localStorage.setItem("routes", JSON.stringify([...routes, temp_obj]));
  }

  const modifyRoute = (id, newRoute) => {
    let updatedRoutes = [];

    if (newRoute == null) {
      updatedRoutes = routes.filter(item => item.id !== id);
    } else {      
      for (let i = 0; i<routes.length; i++) {
        updatedRoutes.push(routes[i]);
        if (updatedRoutes[i].id === id) {
          updatedRoutes[i] = newRoute;
        }
      }
    }

    setRoutes(updatedRoutes);
    localStorage.setItem("routes", JSON.stringify(updatedRoutes));
  }

  useEffect(() => {
    loadData();
  }, []);

  // window.localStorage.removeItem('routes');
  // "homepage": "http://pragyat1295.github.io/travel-app",

  return (
    
    <div >
      <Router>
        <Header/>
        <Routes>
          <Route path = '/' element = {(
            <Home routes={routes}
            modifyRoute={modifyRoute}/>
          )}/>

          <Route path = '/router_form' element = {(
            <RouteForm addRoute={addRoute} />
          )} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
