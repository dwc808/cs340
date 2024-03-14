// Citation for the following function:
// Date: 3/14/2024
// Adapted from CS340 Node.js Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteObserverAnimal(observerAnimalID) {
    // Put our data we want to send in a javascript object
    let data = {
        observerAnimalID: observerAnimalID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-observer-animal-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete data from table
            deleteRow(observerAnimalID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(observerAnimalID){
    let table = document.getElementById("observer-animals-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == observerAnimalID) {
            table.deleteRow(i);
            break;
       }
    }
}