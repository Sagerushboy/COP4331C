<?php

	$inData = getRequestInfo();
	
	$ID = 0;
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$PhoneNumber = "";
	$EmailAddress = "";
	$HomeAddress = "";
	$Birthday = "";
	$Notes = "";
	$UserID = $inData["UserID"];
	
	
	$conn = new mysqli("localhost", "SuperUser", "superPassword", "group25");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID=? AND FirstName=? AND LastName=?");
		$stmt->bind_param("iss", $UserID, $FirstName, $LastName);
		$stmt->execute();
		$result = $stmt->get_result();
		
		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['ID'], $FirstName, $LastName, $row['PhoneNumber'], 
							$row['EmailAddress'], $row['HomeAddress'], $row['Birthday'], 
							$row['Notes'], $UserID );
		}
		else
		{
			returnWithError("No Records Found");
		}
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = 
		'{
			"ID":0,
			"error":"' . $err . '"
		}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $ID, $FirstName, $LastName, $PhoneNumber, $EmailAddress, 
								$HomeAddress, $Birthday, $Notes, $UserID )
	{
		$retValue = '{
		"ID":' . $ID . ',
		"First Name":"' . $FirstName . '",
		"Last Name":"' . $LastName . '",
		"Phone Number":"' . $PhoneNumber . '",
		"Email Address":"' . $EmailAddress . '",
		"Home Address":"' . $HomeAddress . '",
		"Birthday":"' . $Birthday . '",
		"Notes":"' . $Notes . '",
		"User ID":' . $UserID . ',
		"error":""
		}';
		sendResultInfoAsJson( $retValue );
	}
	
?>