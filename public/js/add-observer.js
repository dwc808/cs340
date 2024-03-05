//add-observer.js
// Get the objects we need to modify
let addObserverForm = document.getElementById("add-observer-form-ajax");

// Modify the objects we need
addObserverForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputPhoneNumber = document.getElementById("input-phoneNumber");
    let inputEmailAddress = document.getElementById("input-emailAddress");
    
    // Get the values from the form fields
    let name = inputName.value;
    let phoneNumber = inputPhoneNumber.value;
    let emailAddress = inputEmailAddress.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        name: name,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-observer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputPhoneNumber.value = '';
            inputEmailAddress.value = '';
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
    let currentTable = document.getElementById("observers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let observerIDCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");
    let emailAddressCell = document.createElement("TD");
    

    // Fill the cells with correct data
    observerIDCell.innerText = newRow.observerID;
    nameCell.innerText = newRow.name;
    phoneNumberCell.innerText = newRow.phoneNumber;
    emailAddressCell.innerText = newRow.emailAddress;


    // Add the cells to the row 
    row.appendChild(observerIDCell);
    row.appendChild(nameCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(emailAddressCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Refresh the page
    window.location.reload();
}