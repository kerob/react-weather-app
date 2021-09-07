import React from "react";

let currentLat = "";
let currentLon = "";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
  });
}

// export const currentLocation = {
//   coords: {
//     lat: "",
//     lon: "",
//   },
//   targetData: [],
// };

export const LocationContext = React.createContext({
  lat: currentLat,
  lon: currentLon,
  targetData: [],
});
