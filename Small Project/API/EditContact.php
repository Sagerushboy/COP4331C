<?php

	$inData = getRequestInfo();
	
	$ID = $inData["ID"];
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$PhoneNumber = $inData["PhoneNumber"];
	$EmailAddress = $inData["EmailAddress"];
	$HomeAddress = $inData["HomeAddress"];
	$Birthday = $inData["Birthday"];
	$Notes = $inData["Notes"];
	$UserID = $inData["UserID"];
	
	$conn = new mysqli("localhost", "SuperUser", "superPassword", "group25");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?,LastName=?,PhoneNumber=?,EmailAddress=?,HomeAddress=?,Birthday=?,Notes=? WHERE (ID =? AND UserID =?)");
		$stmt->bind_param("sssssssii", $FirstName, $LastName, $PhoneNumber, $EmailAddress, 
		$HomeAddress, $Birthday, $Notes, $ID, $UserID);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
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
			"error":"' . $err . '"
		}';
		sendResultInfoAsJson( $retValue );
	}
	
?>