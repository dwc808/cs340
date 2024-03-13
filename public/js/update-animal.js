// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-animal-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSpecies = document.getElementById("animalSelect");
    let inputFL = document.getElementById("input-fl-update");
    let inputExpected = document.getElementById("input-expected-update");

    // Get the values from the form fields
    let speciesValue = inputSpecies.value;
    let flValue = inputFL.value;
    let expectedValue = inputExpected.value;
    
    // Cannot take NULL values for either

    if (isNaN(flValue)) 
    {
        return;
    }

    if (isNaN(expectedValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        species: speciesValue,
        fL: flValue,
        eV: expectedValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-animal-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, speciesValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, animalID){
    window.location.reload();
}