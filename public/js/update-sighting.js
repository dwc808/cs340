// Citation for the following function:
// Date: 3/14/2024
// Adapted from CS340 Node.js Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data


// Get the objects we need to modify
let updateSightingForm = document.getElementById('update-sighting-form-ajax');

// Modify the objects we need
updateSightingForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSightingID = document.getElementById("input-sightingID-update").textContent;
    let inputLocationID = document.getElementById("input-locationID-update");
    let inputObserverID = document.getElementById("input-observerID-update");
    let inputAnimalID = document.getElementById("input-animalID-update");
    let inputSightingTime = document.getElementById("input-sightingTime-update");
    let inputSightingDate = document.getElementById("input-sightingDate-update");
    let inputWeather = document.getElementById("input-weather-update");

    // Get the values from the form fields
    let inputLocationIDvalue = inputLocationID.value;
    let inputObserverIDvalue = inputObserverID.value;
    let inputAnimalIDvalue = inputAnimalID.value;
    let inputSightingTimeValue = inputSightingTime.value;
    let inputSightingDateValue = inputSightingDate.value;
    let inputWeatherValue = inputWeather.value;


    // Put our data we want to send in a javascript object
    let data = {
        sightingID: inputSightingID,
        locationID: inputLocationIDvalue,
        observerID: inputObserverIDvalue,
        animalID: inputAnimalIDvalue,
        sightingTime: inputSightingTimeValue,
        sightingDate: inputSightingDateValue,
        weather: inputWeatherValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-sighting-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response);

            // Clear the input fields for another transaction
            inputSightingID = '';
            inputLocationID.value = '';
            inputObserverIDvalue.value = '';
            inputAnimalIDvalue.value = '';
            inputSightingTimeValue.value = '';
            inputSightingDateValue.value = '';
            inputWeatherValue.value = '';
        }
        
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data){
    // Refresh the page
    window.location.reload();
}
