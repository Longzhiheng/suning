<?php  
	
	include "conn.php";
	
    $usename=$_GET['usename'];
     $result=$conn->query("select * from coment where usename='$usename'");
      if($result->fetch_assoc()){//匹配结果索引
              echo true; 
          }
          else{
              echo false;
          };