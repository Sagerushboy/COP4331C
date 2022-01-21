<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";
	$userName = "";

	$conn = new mysqli("localhost", "SuperUser", "superPassword", "group25"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID,UserName,FirstName,LastName FROM Users WHERE Username=? AND Password=?");
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['UserName'], $row['ID'], $row['FirstName'], $row['LastName']);
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
		$retValue = '{"ID":0,"Username":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $userName, $id, $firstName, $lastName)
	{
		$retValue = '{"id":' . $id . ',"Username":"' . $userName . '","First Name":"' . $firstName . '","Last Name":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
