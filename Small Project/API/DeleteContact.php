<?php
	$inData = getRequestInfo();
	
	$ID = $inData["ID"];
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	
	$conn = new mysqli("localhost", "SuperUser", "superPassword", "group25");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=? AND FirstName=? AND LastName=?");
		$stmt->bind_param("iss", $ID, $FirstName, $LastName);
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