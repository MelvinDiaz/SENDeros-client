import useGeolocation from "../Locations/getUserLocation";
import "font-awesome/css/font-awesome.min.css";
import { useMap } from "react-leaflet/hooks";
import { marker } from "leaflet";
import userPNG from "../imgs/user.png"

function GoToLocation() {
  const location = useGeolocation();
  const map = useMap();
  const customMarker = L.icon({
    iconUrl: userPNG,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [4, -40],
  });
  function LocateMe() {
    marker([location.coordinates.lat, location.coordinates.lng], {
      icon: customMarker,
    })
      .addTo(map)
      .bindPopup(`<h1>Your location<h1/>`);
    map.flyTo([location.coordinates.lat, location.coordinates.lng], 17);
  }

  return (
    <div className="btn-locate-div">
      <button className="btn-locate" type="button" onClick={LocateMe}>
        <i className="material-icons">gps_fixed</i>
      </button>
    </div>
  );
}
export default GoToLocation;
