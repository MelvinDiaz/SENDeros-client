
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, } from "react-leaflet";
import GoToLocation from "../GoToLocation/GoToLocation";
import LOGO from "../Logo/logo";
import Markers from "../Markers/markers";
import Footer from "../footer/footer";
import Connection from "../Google_Connection/Conecction/Connection";

const Mapa = () => {
  const default_lat = 13.681349;
  const defaul_lng = -89.189046;
  const defaultZoom = 11;
  const [userInfo, setUserInfo] = useState({});

  return (
    <div>
      <MapContainer
        doubleClickZoom={false}
        center={{ lat: default_lat, lng: defaul_lng }}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <GoToLocation />
        <Connection setUserInfo = {setUserInfo}/>
        <Markers userInfo={userInfo}/>
        
        <LOGO />
        <Footer />
      </MapContainer>
    </div>
  );
};

export default Mapa;