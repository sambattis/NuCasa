import { useState } from "react";
import '../App.css';
import { v4 as uuidv4 } from 'uuid'; // Correct import
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

const google = window.google


export default function Form({data, setData}){
  const [prefData, setPrefData] = useState({car: "",walk: "",bike: ""});
  const [places, setPlaces] = useState([
    { id: uuidv4(), xCo: "", yCo: "", freq: "" }
  ]); 
  const [LatLng, setLatLng] = useState();
  const [address, setAddress] = useState();

  const handlePrefChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setPrefData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setData(formData);
    console.log(prefData);
    console.log(places);
    setData({prefs: prefData, places: places});
};

async function findLocation(data) {
  let response = geocode({ address: data.add1 });
}

// Function to handle input changes for coordinates and frequency
const handlePlaceChange = (index, field, value) => {
  const updatedPlaces = [...places];
  updatedPlaces[index][field] = value;
  setPlaces(updatedPlaces);
  //now I need to place changes to change the other handler
};

  // Function to add more locations dynamically
  const addLocation = (event) => {
    event.preventDefault();
    setPlaces([...places, { id: uuidv4(), xCo: "", yCo: "", freq: "" }]);
  };

const [list, setList] = useState([]);

        //help alerts
      
        const helpPref = (childdata) => {
          alert("This section is used to input your transport mode preference. Type in your preferences in the format shown below.\n\nExample:\nCar: 15 Bike: 20 Walk: 40\n\nExplanation:\nThis indicates that a car trip duration of 15 minutes is as enjoyable as 20 minutes biking or 40 minutes walking.");
        }
      
        const helpAdd= (childdata) => {
          alert("To look up the longitude and latitude of an address, type in the full address you want the coordinates (longitude and latitude) for. Click \"Find Coordinates\" and use the results in the locations section below.\n\nExample:\nYou want to find the longitude and latitude for Ben Hill Griffin Stadium.\nAction:\n1) Type in the address \"157 Gale Lemerand Dr, Gainesville, FL 32611\".\n2) Click the \"Find Coordinates\" button.\nResult:\nThe coordinates [29.6505, -82.3478] should appear. Use these values as a location coordinate below!");
        }

        const helpCoord = (childdata) => {
          alert("For locations, input the longitude, latitude, and frequency of visits per week.\n\nExample: Ben Hill Griffin Stadium is [29.6505, -82.3478] and you go there twice a week. You should input: [29.6505] [-82.3478] [2] in the boxes.");
        }

        const algorithmExp = (childdata) => {
          alert("The NuCasa app allows a user to input up to five locations, along with the number of times per week they plan to visit each location, and a preference from 0-100 for driving, bicycling, and walking. Upon user submission, the app calculates the location that minimizes total transportation 'cost,' considering frequency of travel to each place and transportation preferences. This is achieved by using the Google Maps Directions service to obtain route durations to each desired destination from a large grid of potential home locations. After finding the best option in the first grid, the search is repeated on a second, smaller grid centered on the initial best location.");
        }
      

function geocode(request) {

  let geocoder = new google.maps.Geocoder();
  let response;
    let responseDiv;


  response = document.createElement("pre");
response.id = "response";
response.innerText = "";
responseDiv = document.createElement("div");
responseDiv.id = "response-container";
responseDiv.appendChild(response);


  // clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      //for Coordinate lookup
      console.log("" + results[0].formatted_address);
      setAddress(results[0].formatted_address);
      setLatLng(JSON.stringify(results[0].geometry.location, null, 2));
      responseDiv.style.display = "block";
      console.log("latlng" + LatLng);
      console.log("address" + address);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}
return (
    <div className="form-box">
    <form onSubmit={handleSubmit}>
    <div className="field1">
    <label htmlFor="add1"  className = "button-help">Transport Mode Preference  
    <button   onClick ={() =>helpPref(data)} type="button" class="icon-button" aria-label="Help">
      <i class="fas fa-question-circle"></i>
   </button></label>
      {/* show hint when hover */}
      <label htmlFor="car">Car: <i class="fas fa-car"></i> </label>
      {/* <input placeholder = "0-100" type="number" id="car" name="car" value={formData.car} onChange={handleChange}/> */}
      <input placeholder = "0-100" type="number" id="car" name="car" value={prefData.car} onChange={handlePrefChange}/>
      <label htmlFor="bike">Bike: <i class="fas fa-bicycle"></i> </label>
      <input placeholder = "0-100" type="number" id="bike" name="bike" value={prefData.bike} onChange={handlePrefChange}/>
      <label htmlFor="walk">Walk: <i class="fas fa-walking"></i> </label>
      <input placeholder = "0-100" type="number" id="walk" name="walk" value={prefData.walk} onChange={handlePrefChange}/>
   </div>

      <div className="field1">

      <label htmlFor="add1" className = "button-help">Coordinate Finder
      <button   onClick ={() =>helpAdd(data)} type="button" class="icon-button" aria-label="Help">
      <i class="fas fa-question-circle"></i>
   </button></label>
      {/* <textarea id="add1" placeholder="Ex: 157 Gale Lemerand Dr, Gainesville, FL 32611"  name="add1" value={formData.add1} onChange={handleChange}/> */}
      <textarea id="add1" placeholder="Ex: 157 Gale Lemerand Dr, Gainesville, FL 32611"  name="add1" value={prefData.add1} onChange={handlePrefChange}/>

      
     
    {address ?  {'Address Found' : {address}} : '' } 
    {/* Address Found:  {address} */}
    {/* above line only displays an address if it was searched  */}

      <button className= "button-4" onClick ={() =>findLocation(data)}>Find Coordinates</button>

      {LatLng ?  {'Longitude & Latitude Found' : {LatLng}} : '' } 

 </div>

 <div className="field1">

 
      <div className = "spacer"></div>

      <label className = "button-help" htmlFor="coord1">Locations
      <button    onClick ={() =>helpCoord(data)} type="button" class="icon-button" aria-label="Help">
      <i class="fas fa-question-circle"></i>
   </button>
      </label>

      {places.map((place, index) => (
            <div key={place.id}>
              <p>Location #{index+1}</p>
              <input
                type="number"
                placeholder="Longitude"
                value={place.xCo}
                onChange={(e) => handlePlaceChange(index, "xCo", e.target.value)}
              />
              <input
                type="number"
                placeholder="Latitude"
                value={place.yCo}
                onChange={(e) => handlePlaceChange(index, "yCo", e.target.value)}
              />
              <input
                type="number"
                placeholder="Frequency"
                value={place.freq}
                onChange={(e) => handlePlaceChange(index, "freq", e.target.value)}
              />
            </div>
          ))}
          <button className= "button-4" onClick={addLocation}>Add Another Location</button>
      </div>
      <button className="button-4" type="submit">Go!</button>
      <div className = "spacer"></div>

      <button  className="button-4"    onClick ={() =>algorithmExp(data)} type="button" class="icon-button" aria-label="Help">
      How does NuCasa Work? <i class="fas fa-cogs"></i>
   </button>

    </form>
    </div>

  );
}