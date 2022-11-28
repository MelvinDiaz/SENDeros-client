import React from 'react';
import ReactDOM from 'react-dom/client';
import Mapa from './MapContainer/MapContainer';
import { Auth0Provider } from '@auth0/auth0-react';
import './MapContainer/MapContainer.css';
import './GoToLocation/GoToLocation.css';
import './Logo/logo.css';
import './Google_Connection/Conecction/Connection.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Auth0Provider domain='dev-ngqekl0thre74efy.us.auth0.com' clientId='ZHjiEvnCBCUFEwdwnp1shKrg5ZeJ2DKs' redirectUri={window.location.origin} >
    <Mapa>
      </Mapa>
    </Auth0Provider>

  </React.StrictMode>
)
