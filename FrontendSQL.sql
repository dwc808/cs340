----------------------------------------
--            Animals                 --
----------------------------------------
-- Query for viewing Animals table --
SELECT * FROM Animals;

-- Query for creating a new Animal --
INSERT INTO Animals (species, class, federallyListed, expected)
VALUES ({species_input}, {class_input}, {fListed_input}, {expected_input});

----------------------------------------
--            Locations               --
----------------------------------------

-- Query for viewing Locations table --
SELECT * FROM Locations;

-- Query for Creating new Location --
INSERT INTO Locations (parkName)
VALUES ({park_input});

----------------------------------------
--            Observers               --
----------------------------------------

-- Query for viewing Observers -- 
SELECT * FROM Observers;

-- Query for creating new Observer --
INSERT INTO Observers (name, phoneNumber, emailAddress)
VALUES ({name_input}, {phoneNumber_input}, {emailAddress_input});

----------------------------------------
--           ObserverAnimals          --
----------------------------------------

-- Query for viewing ObserverAnimals -- 
SELECT * FROM ObserverAnimals;

-- Query for populating Observer names dropdown menu --
SELECT name FROM Observers;

-- Query for populating Animal species dropdown menu --
SELECT species FROM Animals;

-- Query for creating new ObserverAnimal --
INSERT INTO ObserverAnimals (observerID, animalID, expertiseLevel, timeofDayPreference)
VALUES ({observer_choice}, {animal_choice}, {expertise_input}, {time_input});

-- Query below modelled after example Delete from exploration
-- https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325

-- Query for deleting ObserverAnimal --
DELETE FROM ObserverAnimals
WHERE observerID = {chosen_observer};

-- Query to select ObserverAnimals' data for update --
SELECT ObserverAnimals.observerAnimalID, Observers.name, Animals.species, ObserverAnimals.expertiseLevel, ObserverAnimals.timeofDayPreference
FROM ObserverAnimals
JOIN Observers ON ObserverAnimals.observerID = Observers.observerID
JOIN Animals ON ObserverAnimals.animalID = Animals.animalID;

-- Query below modelled after example Update from exploration
-- https://canvas.oregonstate.edu/courses/1946034/pages/exploration-database-application-design?module_item_id=23809325

-- Query to update the ObserverAnimal --
UPDATE ObserverAnimals
    SET expertiseLevel = {expertise_input}, timeofDayPreference = {time_input}
    WHERE observerAnimalID = {OA_ID_from_update}

----------------------------------------
--            Sightings               --
----------------------------------------

-- Query for viewing Sightings --
SELECT Sightings.sightingID, Observers.name, Animals.species, Locations.parkName, Sightings.sightingTime, Sightings.sightingDate, Sightings.weather
FROM Sightings
JOIN Observers ON Sightings.observerID = Observers.observerID
JOIN Animals ON Sightings.animalID = Animals.animalID
JOIN Locations ON Sightings.locationID = Locations.locationID;

-- Query for filling Park Name Dropdown --
SELECT parkName FROM Locations;

-- Query for filling Observer Name Dropdown --
SELECT name FROM Observers;

-- Query for filling Species Dropdown --
SELECT species FROM Animals;

-- Query for creating new Sighting --

INSERT INTO Sightings (locationID, observerID, animalID, sightingTime, sightingDate, weather)
VALUES ({location_input}, {observer_input}, {animal_input}, {time_input}, {date_input}, {weather_input});

-- Query for updating Sighting -- 

UPDATE Sightings    
    SET locationID = {location_input}, observerID = {observer_input}, animalID = {animal_input}, 
    sightingTime = {time_input}, sightingDate = {date_input}, weather = {weather_input}
    WHERE sightingID = {Sighting_ID_from_update}


