// Citation for the following function:
// Date: 3/14/2024
// Adapted from CS340 Node.js Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

//add-observer-animal.js
// Get the objects we need to modify
let addObserverAnimalForm = document.getElementById('add-observer-animal-form-ajax');

// Modify the objects we need
addObserverAnimalForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputObserverID = document.getElementById("input-observerID");
    let inputAnimalID = document.getElementById("input-animalID");
    let inputExpertiseLevel = document.getElementById("input-expertiseLevel");
    let inputTimeOfDayPreference = document.getElementById("input-timeOfDayPreference");

    // Get the values from the form fields
    let observerIDValue = inputObserverID.value;
    let animalIDValue = inputAnimalID.value;
    let expertiseLevelValue = inputExpertiseLevel.value;
    let timeOfDayPreferenceValue = inputTimeOfDayPreference.value;

    // Put our data we want to send in a javascript object
    let data = {
        observerID: observerIDValue,
        animalID: animalIDValue,
        expertiseLevel: expertiseLevelValue,
        timeOfDayPreference: timeOfDayPreferenceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-observer-animal-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputObserverID.value = '';
            inputAnimalID.value = '';
            inputExpertiseLevel.value = '';
            inputTimeOfDayPreference.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("This observer is already connected with an animal.")
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("observer-animals-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let observerAnimalIDCell = document.createElement("TD");
    let observerIDCell = document.createElement("TD");
    let animalIDCell = document.createElement("TD");
    let expertiseLevelCell = document.createElement("TD");
    let timeOfDayPreferenceCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    observerAnimalIDCell.innerText = newRow.observerAnimalID;
    observerIDCell.innerText = newRow.observerID;
    animalIDCell.innerText = newRow.animalID;
    expertiseLevelCell.innerText = newRow.expertiseLevel;
    timeOfDayPreferenceCell.innerText = newRow.timeOfDayPreference;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteObserverAnimal(newRow.observerAnimalID);
    };

    // Add the cells to the row 
    row.appendChild(observerAnimalIDCell);
    row.appendChild(observerIDCell);
    row.appendChild(animalIDCell);
    row.appendChild(expertiseLevelCell);
    row.appendChild(timeOfDayPreferenceCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.observerAnimalID);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Refresh the page
    window.location.reload();
}