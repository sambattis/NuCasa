"use client";
import {createRoot} from 'react-dom/client';

import React, {useRef, useState} from "react";
//import * as React from 'react';
import {
  APIProvider,
  useDirectionService,
  useApiIsLoaded,
  useAutocomplete,
  Marker,
  Map,
  AdvancedMarker,
  useDirectionsRenderer,
useMapsLibrary,
  Pin,
  InfoWindow,
  AutocompleteProps,
} from "@vis.gl/react-google-maps"

import Multiple from "./components/Form.js";

const google = window.google

export default function App() {

  const [selected, setSelected] = useState(null);

  // const position = {lat: 51, lng: 9}; 
  const [position, setPosition] = useState({lat: 51, lng: 10});
    // const [data, setData] = useState(10); passes all data from from to map
  const [data, setData] = useState({car: "",walk: "",bus: "",add1: 10,add2: 40,add3: 29,add4: "",add5: ""});

  const childToParent = (childdata) => {
    setData(childdata);
    console.log(data);
  }

  const [map, setMap] = useState((null))
  const [dResponse, setDResponse] = useState(null)
  const [travelTime, setTravelTime] = useState('')
  const [distance, setDistance] = useState('')
  const [drivingPref, setDrivingPref] = useState('')
  const [bikePref, setBikePref] = useState('')
  const [walkPref, setWalkPref] = useState('')
  const destinationRef = useRef()
  const originRef = useRef()
  const travelMethodRef = useRef()

  //destinationRef = position
  //originRef = position2
//{process.env.REACT_APP_API_KEY}

  return (
    
    <APIProvider apiKey = {process.env.REACT_APP_API_KEY}    >

      <div className="App">
        <header className="App-header">
          <h>NuCasa</h>
          <button onClick ={() =>findRouteHelper(data)}>testDirections</button>
        </header>
      </div>
     
      <div class="split left-panel ">
        <Multiple childToParent={childToParent}/>
          <p>{childToParent}</p>
          <button primary onClick={() => childToParent(data)}>Click Child</button>
      </div>


      <div class="split right-panel " style = {{height: "97vh"} }>
        <Map zoom = {9} center = {position} onLoad={map => setMap(map)}>
        {dResponse && (
            <useDirectionsRenderer directions={dResponse} />
          )}
        <Marker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
//onLoad={map => setMap(map)}

const Place = function(xCo, yCo, freq) {
  const xCo_ = xCo;
  const yCo_ = yCo;
  const freq_ = freq;
  return { xCo_, yCo_, freq_ };
};

function calculateStrength(xCo, yCo) {
  const totalScore = 0;
 //findRoute(xCo, yCo, xCo1, yCo1, car) * carPref
 //findRoute(xCo, yCo, xCo1, yCo1, bike) * bikePref
 //and so on
 //put each in a sorted data structure
 //take lowest option
 //multiply by freq
 //add to totalScore
 //repeat for all places
}

  function useDirectionsRenderer({dService}) {
    const isLoaded  = useApiIsLoaded({
      googleMapsApiKey: process.env.REACT_APP_API_KEY,
      libraries: ["places"],
    });
 
   
    const position2 = new google.maps.LatLng(53.5, 9.8);

    
    const directionsRenderer = useMapsLibrary('directionsRenderer');
    directionsRenderer.setMap(map);
    const request = dService.route({
      travelMode: 'DRIVING',
      destination: position,
      origin: position2,
    })
    dService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }

    async function findBestHome(data) {
      //matrix stuff
      //calculateStrength(place being tested)
    }

    async function findRouteHelper(data) {
      const position5 = new google.maps.LatLng(53.5, 9.8);
      const position4 = new google.maps.LatLng(53, 9);
      const position1 = new google.maps.LatLng(data.add1,data.add1);
      const position2 = new google.maps.LatLng(data.add2,data.add2);
      const position3 = new google.maps.LatLng(data.add3,data.add3);
      //findRoute(data.add1, data.add1, data.add2, data.add2, 'DRIVING');
      findRoute(53.5, 9.8, 53,9, 'WALKING');
    }

  async function findRoute(xCo, yCo, xCo1, yCo1, method) {
    
    //UNSUCCESSFUL: TRYING to manipulate visual of map based on positon, ideally this will be the optimal living location
    setPosition({lat: 20, lng: 9});

    const {DirectionsService} = await google.maps.importLibrary("routes")
    const dService = new DirectionsService //added() here idk why it worked

    const origin1 = new google.maps.LatLng(xCo, yCo)
    const destination1 = new google.maps.LatLng(xCo1, yCo1)

    const result = await dService.route({
      origin: origin1,
      destination: destination1,
      travelMode: method,
    })

    setDistance(result.routes[0].legs[0].distance.text)
    setTravelTime(result.routes[0].legs[0].duration.text)
    console.log(distance)
    console.log(travelTime) 
  }
}


window.App= App;

