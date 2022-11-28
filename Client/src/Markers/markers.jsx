import { useMap } from "react-leaflet/hooks";
import "./form.css";
import L, { icon } from "leaflet";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import fenderbender from "../imgs/fender-bender.png"
import fallen from "../imgs/fallen.png"
import agujero from "../imgs/agujero.png"
import nowater from "../imgs/no-water.png"



const markers = ({userInfo}, {userName}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const map = useMap();

  const nombre = { user };
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [35, 60],
      iconAnchor: [20, 50],
      popupAnchor: [4, -40],
    },
  });
  var choque = new LeafIcon({ iconUrl: fenderbender }),
    arbolCaido = new LeafIcon({ iconUrl: fallen }),
    sinTapadera = new LeafIcon({ iconUrl: agujero }),
    sinAgua = new LeafIcon({ iconUrl: nowater });

  const getAll = async () => {
    const response = await fetch(
      "https://senderos.herokuapp.com/api/nonauth/alert/all"
    );
    const marcadores = await response.json();
    console.log(marcadores);
    const contador = marcadores.alerts.length;

    for (let i = 0; i < contador; i++) { //Para choque
      

      if(marcadores.alerts[i].type === "637d06f2840c3e280a7b555d"){
        new L.marker([
          marcadores.alerts[i].latitud,
          marcadores.alerts[i].longitud,
        ], { icon: choque })
          .addTo(map)
          .bindPopup(
            `<div class="markerUser">
              <h1> Choque </h1>
              <p>Reportado por: ${marcadores.alerts[i].user.username}</p>
              </div>`
          );
      } else if (marcadores.alerts[i].type === "637d079e840c3e280a7b5560"){
        new L.marker([
          marcadores.alerts[i].latitud,
          marcadores.alerts[i].longitud,
        ], { icon: sinTapadera })
          .addTo(map)
          .bindPopup(
            `<div class="markerUser">
              <h1> Bache peligroso </h1>
              <p>Reportado por: ${marcadores.alerts[i].user.username}</p>
              </div>`
          );
      } else if(marcadores.alerts[i].type === "637d07f0840c3e280a7b5563"){
        new L.marker([
          marcadores.alerts[i].latitud,
          marcadores.alerts[i].longitud,
        ], { icon: sinAgua })
          .addTo(map)
          .bindPopup(
            `<div class="markerUser">
              <h1> Sin agua </h1>
              <p>Reportado por: ${marcadores.alerts[i].user.username}</p>
              </div>`
          );
      } else if(marcadores.alerts[i].type === "637d10c6840c3e280a7b557f"){
        new L.marker([
          marcadores.alerts[i].latitud,
          marcadores.alerts[i].longitud,
        ], { icon: arbolCaido })
          .addTo(map)
          .bindPopup(
            `<div class="markerUser">
              <h1> Arbol caído </h1>
              <p>Reportado por: ${marcadores.alerts[i].user.username}</p>
              </div>`
          );
      }
        
      
      
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  const fetchMarkers = async () => {
    await getAll(); //Función que hace fetch y muestra los marcadores
  };

  let markerInfo = {
    longitud: "",
    latitud: "",
    type: "",
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzgzODI0MmQ4ZjE4ZDVjYzVhOWYwY2UiLCJpYXQiOjE2Njk1Njg4NzAsImV4cCI6MTY2OTY1NTI3MH0.3Gc-dZ8_BmuNQHrzWXqNatzM6IpVyOfD1StUrBXeeBQ",
    },
    body: JSON.stringify(markerInfo),
  };

  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        "Arbol caído": "Arbol caído",
        Choque: "Choque",
        "Bache peligroso": "Bache peligroso",
        "Sin agua": "Sin agua",
      });
    }, 1000);
  });

  map.on("dblclick", async function addMarker(e) {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes iniciar sesión para agregar marcadores :(",
      });
    } else {
      const { value: emergencia } = await Swal.fire({
        title: "¿Cuál es la emergencia?",
        input: "radio",
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return "Por favor, selecciona una opcion";
          } else {
          }
        },
      });
      if (emergencia) {
        Swal.fire({ html: `Emergencia: ${emergencia} agregada con exito!` });
        
        const _latlng = e.latlng;
        if (emergencia === "Choque") { //choque
          markerInfo = {
            longitud: _latlng.lng,
            latitud: _latlng.lat,
            type: "637d06f2840c3e280a7b555d",
          };
          fetch("https://senderos.herokuapp.com/api/alert/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${userInfo}`,
            },
            body: JSON.stringify(markerInfo),
          }).then(() => {
            
          });
          console.log(userName);
          new L.marker(e.latlng, { icon: choque }).addTo(map).bindPopup(`
            <div class="markerUser">
            <h1> ${emergencia}</h1>
           
            </div>
              `);




        } else if (emergencia === "Bache peligroso") {
          markerInfo = {
            longitud: _latlng.lng,
            latitud: _latlng.lat,
            type: "637d079e840c3e280a7b5560",
          };
          fetch("https://senderos.herokuapp.com/api/alert/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${userInfo}`,
            },
            body: JSON.stringify(markerInfo),
          }).then(() => {
            console.log("askdfjhaklsjfhalkjfhasdlkfhj");
          });
          console.log(userName);
          new L.marker(e.latlng, { icon: sinTapadera }).addTo(map).bindPopup(`
            <div class="markerUser">
            <h1> ${emergencia}</h1>
           
            </div>
              `);




        } else if (emergencia === "Sin agua") {
          markerInfo = {
            longitud: _latlng.lng,
            latitud: _latlng.lat,
            type: "637d07f0840c3e280a7b5563",
          };
          fetch("https://senderos.herokuapp.com/api/alert/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${userInfo}`,
            },
            body: JSON.stringify(markerInfo),
          }).then(() => {
            console.log("askdfjhaklsjfhalkjfhasdlkfhj");
          });
          console.log(userName);
          new L.marker(e.latlng, { icon: sinAgua }).addTo(map).bindPopup(`
            <div class="markerUser">
            <h1> ${emergencia}</h1>
           
            </div>
              `);




        } else if (emergencia === "Arbol caído") {
          markerInfo = {
            longitud: _latlng.lng,
            latitud: _latlng.lat,
            type: "637d10c6840c3e280a7b557f",
          };
          fetch("https://senderos.herokuapp.com/api/alert/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${userInfo}`,
            },
            body: JSON.stringify(markerInfo),
          }).then(() => {
            console.log("askdfjhaklsjfhalkjfhasdlkfhj");
          });
          console.log(userName);
          new L.marker(e.latlng, { icon: arbolCaido }).addTo(map).bindPopup(`
            <div class="markerUser">
            <h1> ${emergencia}</h1>
           
            </div>
              `);
        }
        console.log(markerInfo); //TODO: Mandar a la api este objeto
      }
    }
  });
};

export default markers;
