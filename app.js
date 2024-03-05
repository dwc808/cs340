// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
PORT = 23232;                 // Set a port number at the top so it's easy to change in the future
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector');


/*
    ROUTES
*/

// home page
app.get('/', function(req, res)
    {  
        res.render('home');        
    });

//populate animals table    
app.get('/animals', function(req,res)
    {
        let a_query1 = "SELECT * FROM Animals ORDER BY class;";

        db.pool.query(a_query1, function(error, rows, fields){

            res.render('animals', {data:rows});
        })
    });

//populate locations table
app.get('/locations', function(req,res)
{
    let query1 = "SELECT * FROM Locations ORDER BY parkName;";

    db.pool.query(query1, function(error, rows, fields){

        res.render('locations', {data:rows});
    })
})

//populate observers table
app.get('/observers', function(req,res)
{
    let query1 = "SELECT * FROM Observers;";

    db.pool.query(query1, function(error, rows, fields){

        res.render('observers', {data:rows});
    })
})

//populate observerAnimals
app.get('/observerAnimals', function(req, res)
    {  
        let query1 = "SELECT * FROM ObserverAnimals;";          // Define our query
        let query2 = "SELECT * FROM Observers;";          // Define our query
        let query3 = "SELECT * FROM Animals;";          // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let observerAnimals = rows;
            db.pool.query(query2, (error, rows, fields) => {
                let observers = rows;
                let observermap = {}
                observers.map(observer => {
                    let id = parseInt(observer.observerID, 10);
                    observermap[id] = observer["name"];
                })
                db.pool.query(query3, (error, rows, fields) => {
                    let animals = rows;
                    let animalmap = {}
                    animals.map(animal => {
                        let id = parseInt(animal.animalID, 10);
                        animalmap[id] = animal["species"];
                    })
                    observerAnimals = observerAnimals.map(observerAnimal => {
                        return Object.assign(observerAnimal, {animalID: animalmap[observerAnimal.animalID], observerID: observermap[observerAnimal.observerID]})
                    })
                    res.render('observerAnimals', {data: observerAnimals, observers: observers, animals: animals});   
                })
            })                                                  // Render the observerAnimals.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query, observers, animals etc.

//populate sightings
app.get('/sightings', function(req, res)
    {  
        let query1 = "SELECT * FROM Sightings;";          // Define our query
        let query2 = "SELECT * FROM Locations;";          // Define our query
        let query3 = "SELECT * FROM Observers;";          // Define our query
        let query4 = "SELECT * FROM Animals;";          // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let sightings = rows;
            sightings.forEach(sighting => {
                sighting.sightingDate = formatDate(sighting.sightingDate);
            });
            db.pool.query(query2, (error, rows, fields) => {
                let locations = rows;
                let locationMap = {}
                locations.map(location => {
                    let id = parseInt(location.locationID, 10);
                    locationMap[id] = location["parkName"];
                })
                db.pool.query(query3, (error, rows, fields) => {
                    let observers = rows;
                    let observerMap = {}
                    observers.map(observer => {
                        let id = parseInt(observer.observerID, 10);
                        observerMap[id] = observer["name"];
                    })
                    db.pool.query(query4, (error, rows, fields) => {
                        let animals = rows;
                        let animalMap = {}
                        animals.map(animal => {
                            let id = parseInt(animal.animalID, 10);
                            animalMap[id] = animal["species"];
                        })
                        sightings = sightings.map(sighting => {
                            return Object.assign(sighting, {locationID: locationMap[sighting.locationID], observerID: observerMap[sighting.observerID], animalID: animalMap[sighting.animalID]})
                        })
                        res.render('sightings', {data: sightings, locations: locations, observers: observers, animals: animals});
                    })
                })
            })                                                  // Render the observerAnimals.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    }); 

function formatDate(dateString) {
    let dateObj = new Date(dateString);
    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObj.getDate().toString().padStart(2, '0');
    let year = dateObj.getFullYear();
    return `${month}-${day}-${year}`;
}

//Add new animal    
app.post('/add-animal-ajax', function(req,res)
{
    //get incoming data and parse to a JS object
    let data = req.body;


    //run query for insert
    query1 = `INSERT INTO Animals (species, class, federallyListed, expected) VALUES (?,?,?,?)`;
    db.pool.query(query1, [data.species, data.class, data.fl, data.expected], function(error, rows, fields){
        //log an error if there is one
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Animals;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }

            })
        }
    })
});

//Add location
app.post('/add-location-ajax', function(req,res)
{
    //get incoming data and parse to a JS object
    let data = req.body;


    //run query for insert
    query1 = `INSERT INTO Locations (parkName) VALUES (?)`;
    db.pool.query(query1, [data.parkName], function(error, rows, fields){
        //log an error if there is one
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Locations;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }

            })
        }
    })
});

//Add new observer    
app.post('/add-observer-ajax', function(req,res)
{
    //get incoming data and parse to a JS object
    let data = req.body;


    //run query for insert
    query1 = `INSERT INTO Observers (name, phoneNumber, emailAddress) VALUES (?, ?, ?)`;
    db.pool.query(query1, [data.name, data.phoneNumber, data.emailAddress], function(error, rows, fields){
        //log an error if there is one
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Observers;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }

            })
        }
    })
});

//Add new observer-animal
app.post('/add-observer-animal-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    if (data.expertiseLevel === '') {
        data.expertiseLevel = null;
    }

    if (data.timeOfDayPreference === '') {
        data.timeOfDayPreference = null;
    }

    // Create the query and run it on the database
    query1 = 'INSERT INTO ObserverAnimals (observerID, animalID, expertiseLevel, timeOfDayPreference) VALUES (?, ?, ?, ?)';
    db.pool.query(query1, [data.observerID, data.animalID, data.expertiseLevel, data.timeOfDayPreference], function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM ObserverAnimals;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

//add new sighting
app.post('/add-sighting-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    if (data.locationID === '') {
        data.locationID = null;
    }

    if (data.observerID === '') {
        data.observerID = null;
    }

    if (data.animalID === '') {
        data.animalID = null;
    }

    if (data.sightingTime === '') {
        data.sightingTime = null;
    }

    if (data.sightingDate === '') {
        data.sightingDate = null;
    }

    if (data.weather === '') {
        data.weather = null;
    }

    // Create the query and run it on the database
    query1 = 'INSERT INTO Sightings (locationID, observerID, animalID, sightingTime, sightingDate, weather) VALUES (?, ?, ?, ?, ?, ?)';
    db.pool.query(query1, [data.locationID, data.observerID, data.animalID, data.sightingTime, data.sightingDate, data.weather], function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Sightings;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// edit observerAnimal
app.put('/put-observer-animal-ajax', function(req,res,next)
{
    let data = req.body;
  
    let name = parseInt(data.name);
    let animal = parseInt(data.animal);
    let expertiseLevel = data.expertiseLevel;
    let timeOfDayPreference = data.timeOfDayPreference;
  
    let queryObserverAnimal = `UPDATE ObserverAnimals SET expertiseLevel = ?, timeOfDayPreference = ? WHERE animalID = ? AND observerID = ?`;
  
          // Run the 1st query
          db.pool.query(queryObserverAnimal, [expertiseLevel, timeOfDayPreference, animal, name], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                // If there was no error, perform a SELECT * on bsg_people
                query2 = `SELECT * FROM ObserverAnimals;`;
                db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
              }
            }
          )
        }
);

// delete observer-animal
app.delete('/delete-observer-animal-ajax', function(req,res,next){
    let data = req.body;
    let observerAnimalID = parseInt(data.observerAnimalID);
    let deleteObserverAnimals = `DELETE FROM ObserverAnimals WHERE observerAnimalID = ?`;
          db.pool.query(deleteObserverAnimals, [observerAnimalID], function(error, rows, fields){
              if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              } else {
                    res.sendStatus(204);
              }
  })});
  

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});