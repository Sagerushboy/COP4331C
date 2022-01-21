<?php
	$inData = getRequestInfo();
	
	$UserID = $inData["UserID"];
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$PhoneNumber = $inData["PhoneNumber"];
	$EmailAddress = $inData["EmailAddress"];
	$HomeAddress = $inData["HomeAddress"];
	$Birthday = $inData["Birthday"];
	$Notes = $inData["Notes"];
	
	$conn = new mysqli("localhost", "newUser", "password", "group25");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserID,FirstName,LastName,PhoneNumber,EmailAddress,HomeAddress,Birthday,Notes) VALUES(?,?,?,?,?,?,?,?)");
		$stmt->bind_param("isssssss", $UserID, $FirstName, $LastName, $PhoneNumber, $EmailAddress, $HomeAddress, $Birthday, $Notes);
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>