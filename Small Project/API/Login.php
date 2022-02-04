<?php

	$inData = getRequestInfo();
	
	$ID = 0;
	$FirstName = "";
	$LastName = "";
	$UserName = "";

	$conn = new mysqli("localhost", "SuperUser", "superPassword", "group25"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID,UserName,FirstName,LastName FROM Users WHERE UserName=? 
								AND Password=?");
		$stmt->bind_param("ss", $inData["UserName"], $inData["Password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['UserName'], $row['ID'], $row['FirstName'], $row['LastName'] );
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
			"error":"' . $err . '"
		}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $UserName, $ID, $FirstName, $LastName )
	{
		$retValue = 
		'{
			"ID":' . $ID . ',
			"Username":"' . $UserName . '",
			"First Name":"' . $FirstName . '",
			"Last Name":"' . $LastName . '",
			"error":""
		}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
