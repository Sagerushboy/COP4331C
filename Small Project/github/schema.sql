CREATE TABLE Contacts (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL DEFAULT,
  `LastName` varchar(50) NOT NULL DEFAULT,
  `PhoneNumber` varchar(50) NOT NULL DEFAULT,
  `EmailAddress` varchar(50) NOT NULL DEFAULT,
  `HomeAddress` varchar(50) NOT NULL DEFAULT,
  `Birthday` varchar(50) NOT NULL DEFAULT,
  `Notes` varchar(500) NOT NULL DEFAULT,
  `UserID` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
);


CREATE TABLE Users (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL DEFAULT,
  `LastName` varchar(50) NOT NULL DEFAULT,
  `UserName` varchar(50) NOT NULL DEFAULT,
  `Password` varchar(50) NOT NULL DEFAULT,
  PRIMARY KEY (`ID`)
);