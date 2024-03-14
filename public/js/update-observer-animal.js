// Citation for the following function:
// Date: 3/14/2024
// Adapted from CS340 Node.js Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data


// Get the objects we need to modify
let updateObserverAnimalForm = document.getElementById('update-observer-animal-form-ajax');

// Modify the objects we need
updateObserverAnimalForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputObserverAnimalID = document.getElementById("input-observerAnimalID-update").textContent;
    let inputExpertiseLevel = document.getElementById("input-expertiseLevel-update");
    let inputTimeOfDayPreference = document.getElementById("input-timeOfDayPreference-update");

    // Get the values from the form fields
    let inputExpertiseLevelValue = inputExpertiseLevel.value;
    let inputTimeOfDayPreferenceValue = inputTimeOfDayPreference.value;


    // Put our data we want to send in a javascript object
    let data = {
        observerAnimalID: inputObserverAnimalID,
        expertiseLevel: inputExpertiseLevelValue,
        timeOfDayPreference: inputTimeOfDayPreferenceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-observer-animal-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response);

            // Clear the input fields for another transaction
            inputExpertiseLevel.value = ''
            inputTimeOfDayPreference.value = ''

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
