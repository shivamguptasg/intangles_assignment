/* global google */
import React, { useState, useEffect } from "react";

import { withScriptjs, withGoogleMap } from "react-google-maps";
import { GoogleMap, Marker, InfoWindow, Polyline } from "react-google-maps";

import { PrimaryBlue } from "../../constants/color";

function calDistance(pathCoords) {
  const path = pathCoords.map((coordinates, i, array) => {
    if (i === 0) {
      return { ...coordinates, distance: 0 }; // it begins here!
    }
    const { lat: lat1, lng: lng1 } = coordinates;
    const latLong1 = new google.maps.LatLng(lat1, lng1);

    const { lat: lat2, lng: lng2 } = array[0];
    const latLong2 = new google.maps.LatLng(lat2, lng2);

    // in meters:
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      latLong1,
      latLong2
    );

    return { ...coordinates, distance };
  });

  return path;
}

function getSpeedValue(v) {
  switch (v) {
    case 1:
      return 500;
    case 50:
      return 250;
    case 100:
    default:
      return 125;
  }
}

let i = 0;
let resetCount = 0;
function Map({ paths, speed, resetRouteRef }) {
  const [p, setP] = useState(paths);
  const [curPos, setPos] = useState(null);
  const [reset, setReset] = useState(resetCount);

  useEffect(() => {
    if (resetRouteRef) {
      resetRouteRef.current = {
        reset: () => {
          i = 0;
          resetCount += 1;
          setReset(resetCount);
        },
      };
    }
  }, []);

  useEffect(() => {
    // calculate distance
    const pathCoordsWDistance = calDistance(paths);
    // update paths and current position
    setP(pathCoordsWDistance);
    setPos(pathCoordsWDistance[0]);
  }, [paths]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (i < p.length) {
        setPos(p[i++]);
      } else {
        clearInterval(timer);
      }
    }, getSpeedValue(speed));

    return () => {
      clearInterval(timer);
    };
  }, [p, speed, reset]);

  return (
    <React.Fragment>
      <GoogleMap defaultZoom={12} defaultCenter={paths[0]}>
        {curPos && (
          <Marker
            animation={google.maps.Animation.DROP}
            position={curPos}
            defaultLabel={curPos.distance}
            icon={{
              url: require("../../assets/images/car3.png"),
              scaledSize: new google.maps.Size(30, 30),
            }}
          >
            <InfoWindow>
              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    backgroundColor: PrimaryBlue,
                    color: "white",
                    width: "100%",
                    padding: "8px",
                  }}
                >
                  Travel Info.
                </div>
                <br />
                <span style={{ fontWeight: "bold" }}>Total Distance : </span>
                <span>13408 meters</span>
                <br />
                <span style={{ fontWeight: "bold" }}>
                  Distance travelled :{" "}
                </span>
                <span>{parseInt(curPos.distance || 0)} meters</span>
                <br />
                <span style={{ fontWeight: "bold" }}>
                  Remaining Distance :{" "}
                </span>
                <span>{parseInt(13408 - curPos.distance)} meters</span>
                <br />
                <span style={{ fontWeight: "bold" }}>Speed : </span>
                <span>{curPos.speed}</span>
              </div>
            </InfoWindow>
          </Marker>
        )}
        <Marker position={paths[paths.length - 1]} />
        <Polyline
          path={paths}
          options={{ strokeColor: "green", strokeWeight: 3 }}
        />
      </GoogleMap>
    </React.Fragment>
  );
}

export default withScriptjs(withGoogleMap(Map));
