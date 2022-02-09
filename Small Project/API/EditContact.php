<?php

	$inData = getRequestInfo();
	
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$PhoneNumber = $inData["PhoneNumber"];
	$EmailAddress = $inData["EmailAddress"];
	$HomeAddress = $inData["HomeAddress"];
	$Birthday = $inData["Birthday"];
	$Notes = $inData["Notes"];
	$ID = $inData["ID"];
	
	$conn = new mysqli("localhost", "SuperUser", "superPassword", "group25");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?,LastName=?,PhoneNumber=?,EmailAddress=?, HomeAddress=?, Birthday=?,Notes=? WHERE ID =?");
		$stmt->bind_param("sssssssi", $FirstName, $LastName, $PhoneNumber, $EmailAddress, 
		$HomeAddress, $Birthday, $Notes, $ID);
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
