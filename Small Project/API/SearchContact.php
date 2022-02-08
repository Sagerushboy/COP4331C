<?php

	$inData = getRequestInfo();
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$UserID = $inData["UserID"];
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "SuperUser", "superPassword", "group25");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT FirstName,LastName FROM Contacts WHERE (UserID=?) AND (FirstName OR LastName like ?) AND (FirstName = ? OR LastName = ?)");
		$userName = "%" . $inData["search"] . "%";
		$stmt->bind_param("isss", $UserID, $userName, $inData["FirstName"], $inData["LastName"]);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '"' . $row["FirstName"] . " " . $row["LastName"] . '"';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>