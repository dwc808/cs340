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

