<?php

	$inData = getRequestInfo();
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$UserName = $inData["UserName"];
	$Password = $inData["Password"];

	$conn = new mysqli("localhost", "SuperUser", "superPassword", "group25"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT UserName FROM Users WHERE UserName=?");
		$stmt->bind_param("s", $UserName);
		$stmt->execute();
		$result = $stmt->get_result();
		if( $row = $result->fetch_assoc()  )
		{
			returnWithError("An account with this username already exists");
		}
		else
		{
			$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, UserName, Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss",$FirstName, $LastName, $UserName, $Password);
			$stmt->execute();
			returnWithError("");
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	
?>
