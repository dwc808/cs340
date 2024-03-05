//add-location.js
// Get the objects we need to modify
let addLocationForm = document.getElementById("add-location-form-ajax");

// Modify the objects we need
addLocationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputparkName = document.getElementById("input-parkName");
    
    // Get the values from the form fields
    let parkNameValue = inputparkName.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        parkName: parkNameValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputparkName.value = '';
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
    let currentTable = document.getElementById("locations-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let locationIDCell = document.createElement("TD");
    let parkNameCell = document.createElement("TD");
    

    // Fill the cells with correct data
    locationIDCell.innerText = newRow.locationID;
    parkNameCell.innerText = newRow.parkName;


    // Add the cells to the row 
    row.appendChild(locationIDcell);
    row.appendChild(parkNameCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Refresh the page
    window.location.reload();
}