//add-animal.js
// Get the objects we need to modify
let addAnimalForm = document.getElementById("add-animal-form-ajax");

// Modify the objects we need
addAnimalForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSpecies = document.getElementById("input-species");
    let inputClass = document.getElementById("input-class");
    let inputFLTrue = document.getElementById("flTrue");
    let inputFLFalse = document.getElementById("flFalse");
    let inputExpectedTrue = document.getElementById("isExpectedTrue");
    let inputExpectedFalse = document.getElementById("isExpectedFalse");

    // Get the values from the form fields
    let speciesValue = inputSpecies.value;
    let classValue = inputClass.value;
    let flValue = inputFLTrue.checked? 1 : 0;
    let expectedValue = inputExpectedTrue.checked ? 1 : 0;


    // Put our data we want to send in a javascript object
    let data = {
        species: speciesValue,
        class: classValue,
        fl: flValue,
        expected: expectedValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-animal-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSpecies.value = '';
            inputClass.value = '';
            inputFLTrue.checked = false;
            inputFLFalse.checked = false;
            inputExpectedTrue.checked = false;
            inputExpectedFalse.checked = false;
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
    let currentTable = document.getElementById("animals-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]
    
    // Create a row and 4 cells
    let row = document.createElement("TR");
    let animalIDCell = document.createElement("TD");
    let speciesCell = document.createElement("TD");
    let classCell = document.createElement("TD");
    let flCell = document.createElement("TD");
    let expectedCell = document.createElement("TD");

    // Fill the cells with correct data
    animalIDCell.innerText = newRow.animalID;
    speciesCell.innerText = newRow.species;
    classCell.innerText = newRow.class;
    flCell.innerText = newRow.federallyListed;
    expectedCell.innerText = newRow.expected;

    // Add the cells to the row 
    row.appendChild(animalIDCell);
    row.appendChild(speciesCell);
    row.appendChild(classCell);
    row.appendChild(flCell);
    row.appendChild(expectedCell);

    // Add the row to the table
    currentTable.appendChild(row);

    // Refresh the page
    window.location.reload();
}