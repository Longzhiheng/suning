<?php  
	
	include "conn.php";
	
	$id=$_GET['id'];
	
	$result=$conn->query("select * from iteams where sid=$id ");
	
	$wronglist=$result->fetch_assoc();
	
	echo json_encode($wronglist);

?>