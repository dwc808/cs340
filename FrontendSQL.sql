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
INSERT INTO Locations (county, town, inPark, parkName)
VALUES ({county_input}, {town_input}, {inPark}, {parkName});

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

-- ADD CITATION --
-- Query for deleting ObserverAnimal --
DELETE FROM ObserverAnimals
WHERE observerID = {chosen_observer};

-- FINISH TOMORROW - will want observer name and animal species, joined to expertise? -- 
-- Query to select ObserverAnimals' data for update --
SELECT 

-- Citation --
-- Query to update the ObserverAnimal --
UPDATE ObserverAnimals
    SET expertiseLevel = {expertise_input}, timeofDayPreference = {time_input}
    WHERE observerAnimalID = {OA_ID_from_update}

----------------------------------------
--            Sightings               --
----------------------------------------

-- Query for viewing Sightings --
SELECT * FROM Sightings;

-- Query for filling Locations Dropdown --
SELECT town FROM Locations;

-- NOTE - WHAT WILL WE UPDATE FOR SIGHTINGS? --


