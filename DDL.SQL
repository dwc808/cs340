/*
Creating Animals
*/
CREATE OR REPLACE TABLE Animals (
    animalID INT NOT NULL AUTO_INCREMENT,
    species VARCHAR(50) NOT NULL,
    class VARCHAR(50) NOT NULL,
    federallyListed BOOL NOT NULL,
    expected BOOL NOT NULL,
    PRIMARY KEY (animalID)
);

/*
Creating Observers
*/
CREATE OR REPLACE TABLE Observers (
    observerID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(50) NOT NULL,
    emailAddress VARCHAR(50) NOT NULL,
    PRIMARY KEY (observerID)
);



/*
Creating ObserverAnimals
*/
CREATE TABLE ObserverAnimals (
    observerAnimalID INT,
    observerID INT NOT NULL,
    animalID INT NOT NULL,
    expertiseLevel VARCHAR(50) NOT NULL,
    timeOfDayPreference VARCHAR(50) NOT NULL,
    PRIMARY KEY (observerAnimalID),
    FOREIGN KEY (observerID) REFERENCES Observers(observerID) ON DELETE CASCADE,
    FOREIGN KEY (animalID) REFERENCES Animals(animalID) ON DELETE CASCADE
);


/*
Creating  Locations
*/
CREATE OR REPLACE TABLE Locations (
    locationID INT NOT NULL AUTO_INCREMENT,
    parkName VARCHAR(50),
    PRIMARY KEY (locationID)
);


/*
Creating Sightings
*/
CREATE OR REPLACE TABLE Sightings (
    sightingID INT NOT NULL AUTO_INCREMENT,
    locationID INT NOT NULL,
    observerID INT,
    animalID INT NOT NULL,
    sightingTime TIME NOT NULL,
    sightingDate DATE NOT NULL,
    weather VARCHAR(50) NOT NULL,
    PRIMARY KEY (sightingID),
    FOREIGN KEY (locationID) REFERENCES Locations(locationID) ON DELETE CASCADE,
    FOREIGN KEY (observerID) REFERENCES Observers(observerID) ON DELETE CASCADE,
    FOREIGN KEY (animalID) REFERENCES Animals(animalID) ON DELETE CASCADE
);

/*
Inserting Animals
*/
INSERT INTO Animals (species, class, federallyListed, expected) 
VALUES 
('Canada lynx', 'mammal', FALSE, TRUE),
('American marten', 'mammal', FALSE, TRUE),
('gray fox', 'mammal', FALSE, TRUE);

/*
Inserting Observers
*/
INSERT INTO Observers (name, phoneNumber, emailAddress) 
VALUES 
('Ethan Thompson', '555-789-1234', 'user1@example.net'),
('Olivia Rodriguez', '123-456-7890', 'user2@example.net'),
('Mason Cooper', '987-654-3210', 'user3@example.net');

/*
Inserting ObserverAnimals 
*/
INSERT INTO ObserverAnimals (observerID, animalID, expertiseLevel, timeOfDayPreference) 
VALUES 
(1, 1, 'intermediate', 'morning'),
(2, 2, 'expert', 'night'),
(3, 3, 'intermediate', 'night');

/*
Inserting Locations  
*/
INSERT INTO Locations (parkName) 
VALUES 
('Acadia National Park'),
('Camden Hills State Park'),
("Wolfe's Neck Woods State Park");

/*
Inserting Sightings  
*/
INSERT INTO Sightings (locationID, observerID, animalID, sightingTime, sightingDate, weather) 
VALUES 
(1, 1, 1, '08:45:00', '2023-02-17', 'rain'),
(2, NULL, 2, '14:30:00', '2023-04-05', 'snow'),
(3, 3, 3, '11:15:00', '2023-06-21', 'clear');
