
// Get the objects we need to modify
let updateObserverAnimalForm = document.getElementById('update-observer-animal-form-ajax');

// Modify the objects we need
updateObserverAnimalForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-observerID-update");
    let inputAnimal = document.getElementById("input-animalID-update");
    let inputExpertiseLevel = document.getElementById("input-expertiseLevel-update");
    let inputTimeOfDayPreference = document.getElementById("input-timeOfDayPreference-update");

    // Get the values from the form fields
    let inputNameValue = inputName.value;
    let inputAnimalValue = inputAnimal.value;
    let inputExpertiseLevelValue = inputExpertiseLevel.value;
    let inputTimeOfDayPreferenceValue = inputTimeOfDayPreference.value;

    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(inputNameValue)) 
    {
        return;
    }

    if (isNaN(inputAnimalValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        name: inputNameValue,
        animal: inputAnimalValue,
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
            updateRow(xhttp.response, inputNameValue, inputAnimalValue);

            // Clear the input fields for another transaction
            inputName.value = ''
            inputAnimal.value = ''
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


function updateRow(data, observerID, animalID){
    // Refresh the page
    window.location.reload();
}
