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

app.get('/', function(req, res)
    {  
        res.render('home');        
    });                                                        

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