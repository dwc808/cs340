//add-sighting.js
// Get the objects we need to modify
let addSightingForm = document.getElementById("add-sighting-form-ajax");

// Modify the objects we need
addSightingForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputLocation = document.getElementById("input-locationID");
    let inputObserver = document.getElementById("input-observerID");
    let inputAnimal = document.getElementById("input-animalID");
    let inputSightingTime = document.getElementById("input-sightingTime");
    let inputSightingDate = document.getElementById("input-sightingDate");
    let inputWeather = document.getElementById("input-weather");
    
    // Get the values from the form fields
    let location = inputLocation.value;
    let observer = inputObserver.value;
    let animal = inputAnimal.value;
    let sightingTime = inputSightingTime.value;
    let sightingDate = inputSightingDate.value;
    let weather = inputWeather.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        locationID: location,
        observerID: observer,
        animalID: animal,
        sightingTime: sightingTime,
        sightingDate: sightingDate,
        weather: weather
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sighting-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputLocation.value = '';
            inputObserver.value = '';
            inputAnimal.value = '';
            inputSightingTime.value = '';
            inputSightingDate.value = '';
            inputWeather.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sightings-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let locationIDCell = document.createElement("TD");
    let observerIDCell = document.createElement("TD");
    let animalIDCell = document.createElement("TD");
    let sightingTimeCell = document.createElement("TD");
    let sightingDateCell = document.createElement("TD");
    let weatherCell = document.createElement("TD");
    

    // Fill the cells with correct data
    locationIDCell.innerText = newRow.locationID;
    observerIDCell.innerText = newRow.observerID;
    animalIDCell.innerText = newRow.animalID;
    sightingTimeCell.innerText = newRow.sightingTime;
    sightingDateCell.innerText = newRow.sightingDate;
    weatherCell.innerText = newRow.weather;


    // Add the cells to the row 
    row.appendChild(locationIDCell);
    row.appendChild(observerIDCell);
    row.appendChild(animalIDCell);
    row.appendChild(sightingTimeCell);
    row.appendChild(sightingDateCell);
    row.appendChild(weatherCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Refresh the page
    window.location.reload();
}