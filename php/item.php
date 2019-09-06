<?php  
	
	// include "conn.php";

	// $result=mysql_query("select * from iteams");
	
	// $wronglist=array();
	// for ($i=0; $i < mysql_num_rows($result); $i++) { 
	// 	$wronglist[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	// }

	// echo json_encode($wronglist);
	require "conn.php";//引入数据库连接
    $result=$conn->query("select * from iteams");
    $arrdata=array();

    for($i=0;$i<$result->num_rows;$i++){
        $arrdata[$i]=$result->fetch_assoc();
    }

    echo json_encode($arrdata);
?>