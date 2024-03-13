// This script to toggle the forms was modelled after Professor Curry's example in Module 6:
https://canvas.oregonstate.edu/courses/1946034/pages/exploration-web-application-technology?module_item_id=23809327//

function showforms(form) {
    if (form === "default") {
        document.getElementById('default').style.display = 'block';
        document.getElementById('create').style.display = 'none';
        document.getElementById('update').style.display = 'none';
        
    }

    if (form === "create") {
        document.getElementById('default').style.display = 'none';
        document.getElementById('create').style.display = 'block';
        document.getElementById('update').style.display = 'none';
        
    }

    if (form === "update") {
        document.getElementById('default').style.display = 'none';
        document.getElementById('create').style.display = 'none';
        document.getElementById('update').style.display = 'block';
        
    }
    
};

let editbuttons = document.getElementsByClassName('edit');

window.onload = showforms('default');